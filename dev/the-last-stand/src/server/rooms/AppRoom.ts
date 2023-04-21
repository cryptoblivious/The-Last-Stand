import { Room, Client } from 'colyseus';
import { AppState, UserMapper } from './states/AppState';

export class AppRoom extends Room<AppState> {
  onCreate(options: any) {
    this.roomId = 'app'; // set the room ID to "my_room"
    this.setState(new AppState());
  }

  onJoin(client: Client, user: any) {
    console.log('app room joined!', user);
    const { username, userNo } = user;
    console.log(client.id, 'joined the app room');

    // Create the user's app state data and add it to the app state
    const userMap = new UserMapper();
    userMap.username = username;
    userMap.userNo = userNo;

    this.state.users.set(client.id, userMap);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.id, 'left the app room');

    // Remove the user's app state data from the app state
    this.state.users.delete(client.id);
  }

  onDispose() {
    console.log('app room', this.roomId, 'disposing...');
  }
}
