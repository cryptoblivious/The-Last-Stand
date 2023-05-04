import { Room , Client, matchMaker} from "colyseus";
import { GameLobbyState } from "./states/GameLobbyState";
import { EMessage } from '../../typescript/enumerations/EMessage';
import { ERooms } from '../../typescript/enumerations/ERooms';

export class GameLobbyRoom extends Room {
    
    async onCreate (options: any) {
        this.setState(new GameLobbyState());
        console.log("GameLobbyRoom created!", options);
        const room = await matchMaker.joinOrCreate(ERooms.MatchMakerRoom.toString());
        console.log("MatchMakerRoom joined!", room);

        // messages
        this.onMessage(EMessage.JoinQueue, (client, message) => {
            console.log("JoinQueue", message);
            
            // this.broadcast(EMessage.JoinQueue, message);
        });
    }

    onJoin (client: Client, options: any) {
        this.state.players.set(client.sessionId, options.username)
        console.log("client joined!", options.username);
    }

    onLeave (client: Client, consented: boolean) {
        console.log("client left!", client.sessionId);
    }

    onDispose() {
        console.log("Dispose GameLobbyRoom");
    }

}