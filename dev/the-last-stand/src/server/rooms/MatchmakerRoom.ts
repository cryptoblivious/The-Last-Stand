// MatchmakerRoom.ts
import { Room, Client } from "colyseus";
import { EMessage } from '../../typescript/enumerations/EMessage';

export class MatchmakerRoom extends Room {
    waitingPlayers: Set<string> = new Set();

    onCreate(options: any) {
        console.log("MatchmakerRoom created!");
    }

    onJoin(client: Client, options: any) {
        console.log("Client joined MatchmakerRoom" + client.id + "with options" + options.username);
        this.waitingPlayers.add(client.id);
        console.log("Waiting players: " + this.waitingPlayers.size);
        // if (this.waitingPlayers.length >= 2) { // Change this value for larger groups.
        //     this.broadcast(EMessage.MatchMakerFull, { players: this.waitingPlayers });
        // }
    }

    onLeave(client: Client, consented: boolean) {
        console.log("Client left MatchmakerRoom");
        this.waitingPlayers.delete(client.id);
    }

}
