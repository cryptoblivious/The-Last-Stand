import { Room, Client } from 'colyseus';
import { AppState, UserMapper } from './states/AppState';
import { userModel as User } from '../api/models/user';
export class AppRoom extends Room<AppState> {
  onCreate(options: any) {
    this.roomId = 'app'; // set the room ID to "my_room"
    this.setState(new AppState());
  }

  onAuth(client: Client, user: any) {
    // Check if the user is already connected
    const { username, userNo } = user;
    if (this.state.users.get(username + userNo)) {
      return false;
    }
    return true;
  }

  onJoin(client: Client, user: any) {
    console.log('app room joined!', user);
    const { username, userNo } = user;
    console.log(client.id, 'joined the app room');

    // Create the user's app state data and add it to the app state
    const userMap = new UserMapper();
    userMap.username = username;
    userMap.userNo = userNo;
    userMap.clientId = client.id;

    this.state.users.set(username + userNo, userMap);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.id, 'left the app room');

    // Find the user in the appState using the client ID
    this.state.users.forEach((user: any) => {
      console.log('user.clientId: ', user.clientId, 'client.id: ', client.id);
      if (user.clientId === client.id) {
        console.log('user leaving: ', user.username + user.userNo);
        if (user.username !== 'guest') {
          User.findOneAndUpdate({ username: user.username, userNo: user.userNo }, { lastOnline: new Date() });
        }
      }
    });

    // Remove the user's app state data from the app state
    this.state.users.delete(client.id);
  }

  onDispose() {
    console.log('app room', this.roomId, 'disposing...');
  }
}
