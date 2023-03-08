import { Room, Client } from "colyseus";
import { ServerMatch } from "./schema/ServerMatch";
import Jumper from '../game/game_components/Jumper';
import express from 'express';


export class MatchObserver extends Room<ServerMatch> {

  private inputHandler: Record<number, any> = {

    0: new Jumper(),

  }

  onCreate(options: any) {
    this.setState(new ServerMatch());

    // onMessage handler for "keydown" message that we created in the client "MatchScene" class
    this.onMessage("req_action", (client, message) => {
      // const action = this.inputHandler[message];
      // this.inputHandler[message].execute();
      const msg = this.inputHandler[message].execute();
      const index = this.clients.indexOf(client);
      
      this.broadcast("res_action", {index : index, msg : msg},  {
        
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
