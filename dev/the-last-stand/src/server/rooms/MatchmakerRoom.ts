// MatchmakerRoom.ts
import { Room, Client } from "colyseus";
import { EMessage } from '../../typescript/enumerations/EMessage';

export class MatchmakerRoom extends Room {
    waitingPlayers: Client[] = [];

    onCreate(options: any) {
        console.log("MatchmakerRoom created!");
    }

    onJoin(client: Client, options: any) {
        console.log("Client joined MatchmakerRoom" + client.id + "with options" + options);
        this.waitingPlayers.push(client);

        if (this.waitingPlayers.length >= 2) { // Change this value for larger groups.
            this.broadcast(EMessage.MatchMakerFull, { players: this.waitingPlayers });
        }
    }

    onLeave(client: Client, consented: boolean) {
        console.log("Client left MatchmakerRoom");
        this.waitingPlayers = this.waitingPlayers.filter((player) => player !== client);
    }

}
