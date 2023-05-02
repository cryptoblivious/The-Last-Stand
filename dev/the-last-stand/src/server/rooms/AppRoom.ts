import { Room, Client } from 'colyseus';
import { AppState, UserMapper } from './states/AppState';
import { userModel as User } from '../api/models/user';
import { IMessageMapper } from '../../typescript/interfaces/IMessageMapper';
export class AppRoom extends Room<AppState> {
  onCreate(options: any) {
    this.roomId = 'app'; // set the room ID to "my_room"
    this.setState(new AppState());

    this.onMessage('message', (client, message) => {
      this.state.users.forEach((user: any) => {
        if (user.clientId === client.id) {
          const messageMapper = new IMessageMapper();
          messageMapper.username = user.username;
          messageMapper.userNo = user.userNo;
          messageMapper.content = message;
          messageMapper.date = new Date().toLocaleDateString([], { dateStyle: 'full' });
          messageMapper.time = new Date().toLocaleTimeString([], { timeStyle: 'medium', hour12: false });

          //this.state.messages.push(messageMapper);
          this.broadcast('message', messageMapper);
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
    console.log('app room joined!', user);
    const { username, userNo } = user;
    console.log(client.id, 'joined the app room');
    const messageMapper = new IMessageMapper();
    messageMapper.username = username;
    messageMapper.userNo = userNo;
    messageMapper.content = 'joined the global chat';
    messageMapper.date = new Date().toLocaleDateString([], { dateStyle: 'full' });
    messageMapper.time = new Date().toLocaleTimeString([], { timeStyle: 'medium', hour12: false });
    this.broadcast('message', messageMapper);

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
        console.log('user leaving: ', user.username + user.userNo);
        this.state.users.delete(user.username + user.userNo);
        const { username, userNo } = user;
        const messageMapper = new IMessageMapper();
        messageMapper.username = username;
        messageMapper.userNo = userNo;
        messageMapper.content = 'left the global chat';
        messageMapper.date = new Date().toLocaleDateString([], { dateStyle: 'full' });
        messageMapper.time = new Date().toLocaleTimeString([], { timeStyle: 'medium', hour12: false });
        this.broadcast('message', messageMapper);

        if (user.username !== 'guest') {
          this.updateLastOnline(user);
        }
      }
    });
  }

  onDispose() {
    console.log('app room', this.roomId, 'disposing...');
  }
}
