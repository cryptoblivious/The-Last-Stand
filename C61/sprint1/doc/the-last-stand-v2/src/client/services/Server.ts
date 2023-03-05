import { Client } from 'colyseus.js';
import Phaser from 'phaser';
import IMatchState from '../../types/IMatchState';

//dotenv.config();
//const port: string = process.env.PORT?.toString() ?? '';

export default class Server {
  private client: Client;
  private events = new Phaser.Events.EventEmitter();
  

  // create a client instance
  constructor() {
    this.client = new Client('ws://localhost:9001');
    this.events = new Phaser.Events.EventEmitter();
    console.log(this.client);
  }

  async join() {
    // join room "match_room"
    const room = await this.client.joinOrCreate<IMatchState>('match_room');
    console.log(room);
    // listen to state changes
    room.onStateChange.once((state) => {
      this.events.emit('once-state-change', state);
    }
    );
  }

  onceStateChanged(callback:(state:IMatchState)=>void, context?:any) 
  {
    this.events.once('once-state-change', callback, context);
  }

}
