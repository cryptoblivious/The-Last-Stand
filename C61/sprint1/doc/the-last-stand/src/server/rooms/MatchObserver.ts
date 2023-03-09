import { Room, Client } from "colyseus";
import { ServerMatch } from "./schema/ServerMatch";
import Jumper from '../game/game_components/Jumper';
import GameEntity from '../game/GameEntity';

export class MatchObserver extends Room<ServerMatch> {

  // private gameEntity: GameEntity = new GameEntity(0, 'player', { x: 0, y: 0 }, { width: 32, height: 32 });
  

  private inputHandler: Record<number, any> = {

    0: "jumper",

  }

  onCreate(options: any) {
    this.setState(new ServerMatch());

    // this.gameEntity.addComponent('jumper', new Jumper());

    // onMessage handler for "keydown" message that we created in the client "MatchScene" class
    this.onMessage("req_action", (client, message) => {
      // const action = this.inputHandler[message];
      // this.inputHandler[message].execute();

      
      let msg  
      // const component =  this.gameEntity.components.get(this.inputHandler[message])?.execute();
      
      const index = this.clients.indexOf(client);
      
      this.broadcast("res_action", message,  {
        
        //except: client
      });
      
      // handle "type" message
      
    });
  }

  // this.onMessage("action", (client, message) => {

  onJoin(client: Client, options: any) {
    // console.log(client.sessionId, "Tabarnak!");
    console.log(client.id, "Tabarnak!");
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
