import { Room, Client } from 'colyseus';
import { AppState } from './states/AppState';
import { userModel as User } from '../api/models/user';
import { conversationModel as Conversation } from '../api/models/conversation';
import { IMessageMapper } from '../../typescript/interfaces/IMessageMapper';
import { IUserMapper } from '../../typescript/interfaces/IUserMapper';
import { MongoClient, ChangeStream } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const { MONGO_URI } = process.env;

interface IHandleMessageKwargs {
  conversationId: string;
  content: string;
}
export class AppRoom extends Room<AppState> {
  private client: MongoClient;
  private usersChangeStream: ChangeStream;
  private messagesChangeStream: ChangeStream;

  constructor() {
    super();
    this.client = new MongoClient(MONGO_URI!);
    const db = this.client.db('tls');
    const users = db.collection('users');
    const usersPipeline = [
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
    this.usersChangeStream = users.watch(usersPipeline, { fullDocument: 'updateLookup' });

    this.usersChangeStream.on('change', (change: any) => {
      const data = {
        _id: change.fullDocument._id,
        username: change.fullDocument.username,
        userNo: change.fullDocument.userNo,
        title: change.fullDocument.title,
        lastOnline: change.fullDocument.lastOnline,
      };
      this.broadcast('userChange', data);
    });

    const messages = db.collection('messages');
    this.messagesChangeStream = messages.watch();
    this.messagesChangeStream.on('change', (change) => {
      this.broadcast('messagesChange', change);
    });
  }

  onCreate(options: any) {
    this.roomId = 'app'; // set the room ID to "my_room"
    this.setState(new AppState());
    this.onMessage('message', (client, message) => {
      this.state.users.forEach((user: any) => {
        if (user.clientId === client.id) {
          if (user.username !== 'guest') {
            console.log('handling message', message);
            this.handleMessage(message, user._id, user.username, user.userNo);
          }
        }
      });
    });
  }

  // onAuth(client: Client, user: any) {
  //   // Check if the user is already connected
  //   const { username, userNo } = user;
  //   if (this.state.users.get(username + userNo)) {
  //     return false;
  //   }
  //   return true;
  // }

  async onJoin(client: Client, user: any) {
    const { _id, username, userNo } = user;

    const globalChat = await Conversation.findOne({ isGlobal: true });

    if (username !== 'guest') {
      this.handleMessage({ conversationId: globalChat._id, content: 'joined the global chat' }, _id, username, userNo);
    }

    // Create the user's app state data and add it to the app state
    const userMap = new IUserMapper();
    userMap._id = _id;
    userMap.username = username;
    userMap.userNo = userNo;
    userMap.clientId = client.id;
    this.state.users.set(username + userNo, userMap);
  }

  updateLastOnline = async (user: any) => {
    const { username, userNo } = user;
    try {
      await User.findOneAndUpdate({ username: username, userNo: userNo }, { lastOnline: new Date() });
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
    messageMapper.date = new Date().toLocaleDateString([], { dateStyle: 'full' });
    messageMapper.time = new Date().toLocaleTimeString([], { timeStyle: 'medium', hour12: false });
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
          const { _id, username, userNo } = user;
          this.handleMessage({ conversationId: globalChat._id, content: 'left the global chat' }, _id, username, userNo);
          this.updateLastOnline(user);
        }
        this.state.users.delete(user.username + user.userNo);
      }
    });
  }

  async onDispose() {
    console.log('app room', this.roomId, 'disposing...');
    await this.usersChangeStream.close();
    await this.messagesChangeStream.close();
    await this.client.close();
  }
}
