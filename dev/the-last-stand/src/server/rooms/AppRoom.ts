import { Room, Client } from 'colyseus';
import { AppState } from './states/AppState';
import { userModel as User } from '../api/models/user';
import { conversationModel as Conversation } from '../api/models/conversation';
import { IMessageMapper } from '../../typescript/interfaces/IMessageMapper';
import { IUserMapper } from '../../typescript/interfaces/IUserMapper';
import { MongoClient, ChangeStream } from 'mongodb';
import dotenv from 'dotenv';
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
        console.log('a user has changed', change.fullDocument);
        const data = {
          _id: change.fullDocument._id,
          username: change.fullDocument.username,
          userNo: change.fullDocument.userNo,
          title: change.fullDocument.title,
          lastOnline: change.fullDocument.lastOnline,
        };
        this.broadcast('usersChange', data);

        // check for the user in the room state and update it if it exists
        this.state.users.forEach((user: any) => {
          if (user._id === data._id.toString()) {
            const userMapper = new IUserMapper();
            userMapper._id = data._id;
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
        this.broadcast('conversationsChange', data);
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
      //this.handleMessage({ conversationId: globalChat._id, content: 'Joined the global chat.' }, _id, username, userNo);
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

  handleMessage = async (message: IHandleMessageKwargs, _id?: string, username?: string, userNo?: string) => {
    const messageMapper = new IMessageMapper();
    messageMapper.userId = _id;
    messageMapper.username = username;
    messageMapper.userNo = userNo;
    messageMapper.content = message.content;
    this.broadcast('message', messageMapper);
    try {
      await Conversation.findOneAndUpdate({ _id: message.conversationId }, { $push: { messages: messageMapper } });
    } catch (error) {
      console.error('Error updating conversation:', error);
    }
  };

  async onLeave(client: Client, consented: boolean) {
    const globalChat = await Conversation.findOne({ isGlobal: true });

    this.state.users.forEach((user: any) => {
      if (user.clientId === client.id) {
        if (user.username !== 'guest') {
          const { _id } = user;
          // this.handleMessage({ conversationId: globalChat._id, content: 'Left the global chat.' }, _id, username, userNo);
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
