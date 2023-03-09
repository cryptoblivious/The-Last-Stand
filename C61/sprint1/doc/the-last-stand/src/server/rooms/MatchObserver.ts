import { Room, Client } from "colyseus";
import { ServerMatch } from "./schema/ServerMatch";
import Jumper from '../game/game_components/Jumper';
import GameEntity from '../game/GameEntity';
import { Index } from '../../../../../../../dev/tutorials/react-router/src/routes/index';
import { onStateChange } from '../../../../../../../dev/tutorials/colyseus-get-started/loadtest/example';

export class MatchObserver extends Room<ServerMatch> {

  maxClients: number = 4;
  // private gameEntity: GameEntity = new GameEntity(0, 'player', { x: 0, y: 0 }, { width: 32, height: 32 });
  
  private positionHandler: Record<number, {x:number,y:number}> = {
    0: {x: 50, y: 50},
    1: {x: 100, y: 50},
    2: {x: 150, y: 50},
    3: {x: 200, y: 50}
  }

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
    const index = this.clients.indexOf(client);
    const entity = new GameEntity(index , client.sessionId, this.positionHandler[index], { width: 32, height: 32 });
    // console.log(entity);
    this.state.entities.push(entity);
    // console.log(this.state.entities);

    // client.send('entities', this.state.entities.toArray());

    console.log(this.state.entities.length);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    // delete the entity related to the client 
    for (let i = 0; i < this.state.entities.length; i++) {
      if (this.state.entities[i].name === client.sessionId) {
        this.state.entities.splice(i, 1);
      }
    }
    console.log(this.state.entities.length);
    // client.send('entities', this.state.entities.toArray());

    
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }


}
