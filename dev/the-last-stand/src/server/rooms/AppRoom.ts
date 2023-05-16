import { Room, Client } from 'colyseus';
import { AppState } from './states/AppState';
import { userModel as User } from '../api/models/user';
import { conversationModel as Conversation } from '../api/models/conversation';
import { IMessageMapper } from '../../typescript/interfaces/IMessageMapper';
import { IUserMapper } from '../../typescript/interfaces/IUserMapper';
import { MongoClient, ChangeStream } from 'mongodb';
import dotenv from 'dotenv';
import { EMessage } from '../../typescript/enumerations/EMessage';
//import cron from 'node-cron';
dotenv.config();
const { MONGO_URI } = process.env;

interface IHandleMessageKwargs {
  conversationId: string;
  content: string;
}
export class AppRoom extends Room<AppState> {
  private client: MongoClient;
  private conversationsChangeStream: ChangeStream;
  private usersChangeStream: ChangeStream;
  private messagesChangeStream: ChangeStream;

  constructor() {
    super();
    this.client = new MongoClient(MONGO_URI!);

    const updateFullDocumentWithIdPipeline = [
      {
        $match: {
          operationType: 'update',
        },
      },
      {
        $project: {
          _id: 1,
          fullDocument: 1,
        },
      },
    ];

    const start = async () => {
      await this.client.connect();
      const db = this.client.db('tls');
      const users = db.collection('users');
      this.usersChangeStream = users.watch(updateFullDocumentWithIdPipeline, { fullDocument: 'updateLookup' });

      this.usersChangeStream.on('change', (change: any) => {
        const data = {
          _id: change.fullDocument._id,
          username: change.fullDocument.username,
          userNo: change.fullDocument.userNo,
          title: change.fullDocument.title,
          lastOnline: change.fullDocument.lastOnline,
          activeConversationsIds: change.fullDocument.activeConversationsIds,
        };
        this.broadcast(EMessage.UsersChange, data);

        // check for the user in the room state and update it if it exists
        this.state.users.forEach((user: any) => {
          if (user._id === data._id.toString()) {
            const userMapper = new IUserMapper();
            userMapper._id = data._id.toString();
            userMapper.username = data.username;
            userMapper.userNo = data.userNo;
            userMapper.title = data.title;
            userMapper.clientId = user.clientId;
            userMapper.lastOnline = data.lastOnline;
            this.state.users.set(data._id, userMapper);
          }
        });
      });

      const conversations = db.collection('conversations');
      this.conversationsChangeStream = conversations.watch(updateFullDocumentWithIdPipeline, { fullDocument: 'updateLookup' });
      this.conversationsChangeStream.on('change', (change: any) => {
        const data = {
          _id: change.fullDocument._id,
          messages: change.fullDocument.messages,
        };
        this.broadcast(EMessage.ConversationsChange, data);
      });

      const messages = db.collection('messages');
      this.messagesChangeStream = messages.watch();
      this.messagesChangeStream.on('change', (change) => {
        this.broadcast('messagesChange', change);
      });
    };
    // Call the start function to connect to the client and start the change streams
    start();
  }

  onCreate(options: any) {
    this.roomId = 'app'; // set the room ID to "my_room"
    this.setState(new AppState());
    this.onMessage('message', (client, message) => {
      this.state.users.forEach((user: any) => {
        if (user.clientId === client.id) {
          if (user.username !== 'guest') {
            this.handleMessage(message, user._id, user.username, user.userNo);
          }
        }
      });
    });
    this.onMessage(EMessage.ToggleConversation, (client, conversationId) => {
      console.log("received 'toggle conversation' message from client: ", client.id, ' with conversationId: ', conversationId);
      this.state.users.forEach((user: any) => {
        if (user.clientId === client.id) {
          this.handleToggleConversation(user._id, conversationId);
        }
      });
    });
  }

  onAuth(client: Client, user: any) {
    // Check if the user is already connected
    const { username, userNo } = user;
    if (this.state.users.get(username + userNo)) {
      return false;
    }
    return true;
  }

  async onJoin(client: Client, user: any) {
    const { _id, username, userNo } = user;

    const globalChat = await Conversation.findOne({ isGlobal: true });

    if (username !== 'guest') {
      //this.handleMessage({ conversationId: globalChat._id, content: `${username}#${userNo} joined the global chat.` }, _id, username, userNo, 'Server');
    }

    // Create the user's app state data and add it to the app state
    const userMap = new IUserMapper();
    userMap._id = _id;
    userMap.username = username;
    userMap.userNo = userNo;
    userMap.clientId = client.id;
    this.state.users.set(_id, userMap);
  }

  updateLastOnline = async (_id: string) => {
    try {
      await User.findOneAndUpdate({ _id }, { lastOnline: new Date() });
    } catch (error) {
      console.error('Error updating lastOnline date:', error);
    }
  };

  handleMessage = async (message: IHandleMessageKwargs, _id?: string, username?: string, userNo?: string, sender?: string) => {
    const messageMapper = new IMessageMapper();
    if (sender) {
      messageMapper.userId = '0000';
      messageMapper.username = sender;
      messageMapper.userNo = '0000';
    } else {
      messageMapper.userId = _id;
      messageMapper.username = username;
      messageMapper.userNo = userNo;
    }
    messageMapper.content = message.content;
    this.broadcast('message', messageMapper);
    try {
      await Conversation.findOneAndUpdate({ _id: message.conversationId }, { $push: { messages: messageMapper } });
    } catch (error) {
      console.error('Error updating conversation:', error);
    }
  };

  handleToggleConversation = async (userId: string, conversationId: string) => {
    try {
      // get the user's active conversations
      const { activeConversationsIds } = await User.findOne({ _id: userId }, { activeConversationsIds: 1, _id: 0 });
      if (!activeConversationsIds.includes(conversationId)) {
        console.log("adding conversationId to user's activeConversationsIds");
        await User.findOneAndUpdate({ _id: userId }, { $addToSet: { activeConversationsIds: conversationId } });
      } else {
        console.log("removing conversationId from user's activeConversationsIds");
        await User.findOneAndUpdate({ _id: userId }, { $pull: { activeConversationsIds: conversationId } });
      }
    } catch (error) {
      console.error('Error finding conversation:', error);
    }
  };

  async onLeave(client: Client, consented: boolean) {
    const globalChat = await Conversation.findOne({ isGlobal: true });

    this.state.users.forEach((user: any) => {
      if (user.clientId === client.id) {
        if (user.username !== 'guest') {
          const { _id, username, userNo } = user;
          //this.handleMessage({ conversationId: globalChat._id, content: `${username + userNo} left the global chat.` }, _id, username, userNo, 'Server');
          this.updateLastOnline(_id);
        }
        this.state.users.delete(user._id);
      }
    });
  }

  async onDispose() {
    //set all users offline
    this.state.users.forEach((user: any) => {
      this.updateLastOnline(user._id);
    });
    await this.usersChangeStream.close();
    await this.messagesChangeStream.close();
    await this.conversationsChangeStream.close();
    await this.client.close();
  }
}
