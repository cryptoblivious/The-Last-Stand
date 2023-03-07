import { Client, Room } from 'colyseus.js';
import Phaser from 'phaser';
import IMatchState from '../../types/IMatchState';
import { Message } from '../../types/messages';
import { Schema } from '@colyseus/schema'

//dotenv.config();
//const port: string = process.env.PORT?.toString() ?? '';

export default class Server {
  private client: Client;
  private events : Phaser.Events.EventEmitter;
  private room?: Room<IMatchState & Schema>;


  // create a client instance
  constructor() {
    this.client = new Client('ws://localhost:9001');
    this.events = new Phaser.Events.EventEmitter();
  }

  async join() {
    // join room "match_room"
    this.room = await this.client.joinOrCreate<IMatchState & Schema> ('match_room');
    // listen to state changes
    this.room.onStateChange.once((state) => {
      this.events.emit('once-state-change', state);
    });



    // need to check if the state is changing
    // this.room.onStateChange((state) => {
    //   console.log(state)
    //   if (state.board) {
    //     this.events.emit('board-change', state.board);
    //     console.log('board change')
    //   }
    // });
    
    
    this.room.state.onChange = (changes) => {
      console.log(changes)
      changes.forEach((change) => {
        const { field, value } = change;
        console.log(field + ' changed to ' + value)
        if (field === 'board') {
          this.events.emit('board-change', value);
          console.log('board change')
        }
      });
    }

  }

  makeSelection(index: number) {
    if (!this.room) {
      console.log('room not found');
      return
    }
    this.room.send(Message.PlayerSelection, {index :index } )
  }

  onceStateChanged(callback: (state: IMatchState) => void, context?: any) {
    this.events.once('once-state-change', callback, context);
  }

  onBoardChange(callback: (board: number[]) => void, context?: any) {
    this.events.on('board-change', callback, context);
  }

}
