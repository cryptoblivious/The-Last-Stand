import { Command } from '@colyseus/command';
import { Client, Room } from 'colyseus';
import { IMatchState } from '../../typescript/interfaces/IMatchState';
import { ECell } from '../../typescript/enumerations/ECell';

type Payload = {
  client: Client;
  index: number;
};

export default class PlayerSelectionCommand extends Command<Room<IMatchState>, Payload> {
  execute(data: Payload) {
    const { client, index } = data;

    const clientIndex = this.room.clients.findIndex((c) => c.id === client.id);

    const cellValue = clientIndex === 0 ? ECell.X : ECell.O;

    this.room.state.board[index] = cellValue;

    console.log(this.room.state.board);

    // console.log(this.room + " " + clientIndex)
  }
}
