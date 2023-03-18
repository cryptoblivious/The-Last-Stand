import { Client, Room } from 'colyseus.js';
import Phaser from 'phaser';
import { IMatchState } from '../../typescript/interfaces/IMatchState';
import { EMessage } from '../../typescript/enumerations/EMessage';
import { WS_PROTOCOL, HOST_NAME, HOST_PORT } from '../domain_config';
export default class LocalServer {
  private client: Client;
  private events: Phaser.Events.EventEmitter;
  private room?: Room;

  public action_map: Record<string, integer> = {
    w: 0,
    a: 1,
    s: 2,
    d: 3,
  };

  // create a client instance
  constructor() {
    //this.client = new Client('ws://localhost:80');
    this.client = new Client(`${WS_PROTOCOL}://${HOST_NAME}:${HOST_PORT}`);

    this.events = new Phaser.Events.EventEmitter();
  }

  async join() {
    // join room "match_room"
    this.room = await this.client.joinOrCreate('match_room');
    console.log(this.room);
    // listen to state changes
    // this.room.onStateChange.once((state) => {
    //   this.events.emit('once-state-change', state);
    // });
    // this.room.onMessage('action', (message) => {
    //   console.log(message);
    // });s
  }

  clientInputHandler(key: integer) {
    if (!this.room) {
      console.log('room not found');
      return;
    }
    console.log(this.room);
    this.room.send('action', { key: key });
  }

  makeSelection(index: number) {
    if (!this.room) {
      console.log('room not found');
      return;
    }
    this.room.send(EMessage.PlayerSelection, { index: index });
  }

  onceStateChanged(callback: (state: IMatchState) => void, context?: any) {
    this.events.once('once-state-change', callback, context);
  }

  onBoardChange(callback: (board: number[]) => void, context?: any) {
    this.events.on('board-change', callback, context);
  }
}
