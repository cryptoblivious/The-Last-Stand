import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/Archives";

export class MatchRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());

    // onMessage handler for "keydown" message that we created in the client "FirstGame" class
    this.onMessage("action", (client, message) => {
      const action_map : Record<integer,string> = {
        0: 'up',
        1: 'left',
        2: 'down',
        3: 'right',
      }
      this.broadcast("action", action_map[message], {
        //except: client
      });
      //
      // handle "type" message
      //
    });
  }

  // this.onMessage("action", (client, message) => {

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
