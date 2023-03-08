import { Client, Room } from 'colyseus';
import { MatchRoomState } from './schema/MatchRoomState';
import { EMessage } from '../../typescript/enumerations/EMessage';
import { Dispatcher } from '@colyseus/command';
import PlayerSelectionCommand from '../commands/PlayerSelectionCommands';

// export default didnt work here but classic export did
export class MatchRoom extends Room<MatchRoomState> {
  private dispatcher = new Dispatcher(this);

  onCreate() {
    // set initial room state
    this.setState(new MatchRoomState());

    this.onMessage(EMessage.PlayerSelection, (client, message: { index: number }) => {
      this.dispatcher.dispatch(new PlayerSelectionCommand(), {
        client: client,
        index: message.index,
      });
      // console.log(Message.PlayerSelection, client.sessionId, message.index)
    });
  }
}
