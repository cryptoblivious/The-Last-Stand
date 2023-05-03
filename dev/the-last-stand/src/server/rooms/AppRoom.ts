import { Room, Client } from 'colyseus';
import { AppState, UserMapper } from './states/AppState';
import { userModel as User } from '../api/models/user';
import { IMessageMapper } from '../../typescript/interfaces/IMessageMapper';
import { MongoClient, ChangeStream } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const { MONGO_URI } = process.env;
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
        username: change.fullDocument.username,
        userNo: change.fullDocument.userNo,
        title: change.fullDocument.title,
        lastOnline: change.fullDocument.lastOnline,
      };
      this.broadcast('change', data);
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
            const messageMapper = new IMessageMapper();
            messageMapper.username = user.username;
            messageMapper.userNo = user.userNo;
            messageMapper.content = message;
            messageMapper.date = new Date().toLocaleDateString([], { dateStyle: 'full' });
            messageMapper.time = new Date().toLocaleTimeString([], { timeStyle: 'medium', hour12: false });

            //this.state.messages.push(messageMapper);
            this.broadcast('message', messageMapper);
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

  onJoin(client: Client, user: any) {
    const { username, userNo } = user;
    console.log(client.id, 'joined the app room');
    if (username !== 'guest') {
      const messageMapper = new IMessageMapper();
      messageMapper.username = username;
      messageMapper.userNo = userNo;
      messageMapper.content = 'joined the global chat';
      messageMapper.date = new Date().toLocaleDateString([], { dateStyle: 'full' });
      messageMapper.time = new Date().toLocaleTimeString([], { timeStyle: 'medium', hour12: false });
      this.broadcast('message', messageMapper);
    }

    // Create the user's app state data and add it to the app state
    const userMap = new UserMapper();
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

  onLeave(client: Client, consented: boolean) {
    console.log(client.id, 'left the app room');

    this.state.users.forEach((user: any) => {
      if (user.clientId === client.id) {
        if (user.username !== 'guest') {
          console.log('user leaving: ', user.username + user.userNo);
          const { username, userNo } = user;
          const messageMapper = new IMessageMapper();
          messageMapper.username = username;
          messageMapper.userNo = userNo;
          messageMapper.content = 'left the global chat';
          messageMapper.date = new Date().toLocaleDateString([], { dateStyle: 'full' });
          messageMapper.time = new Date().toLocaleTimeString([], { timeStyle: 'medium', hour12: false });
          this.broadcast('message', messageMapper);
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
