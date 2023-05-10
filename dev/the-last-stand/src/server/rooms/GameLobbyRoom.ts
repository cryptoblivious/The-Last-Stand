import { Room , Client, matchMaker} from "colyseus";
import { GameLobbyState } from "./states/GameLobbyState";
import { EMessage } from '../../typescript/enumerations/EMessage';
import { ERooms } from '../../typescript/enumerations/ERooms';

export class GameLobbyRoom extends Room {
    
    onCreate (options: any) {
        this.setState(new GameLobbyState());
        console.log("GameLobbyRoom created!", options);
        

        // messages
        // this.onMessage(EMessage.JoinQueue, async (client, message) => {
        //     // console.log("JoinQueue", message);
        //     // const room = await this.joinMatchMakerRoom();
        //     // console.log("MatchMakerRoom joined!", room);
        //     this.broadcast(EMessage.JoinQueue, {client, message});
        // });
    }

    async joinMatchMakerRoom() {
        const room = await matchMaker.joinOrCreate('match_maker_room');
        return room;
    }

    onJoin (client: Client, options: any) {
        this.state.players.set(client.sessionId, options.username)
        console.log("client joined game lobby room ", options.username);
    }

    onLeave (client: Client, consented: boolean) {
        console.log("client left game lobby room !", client.sessionId);
    }

    onDispose() {
        console.log("Dispose GameLobbyRoom");
    }

}