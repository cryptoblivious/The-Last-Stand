import { Room , Client} from "colyseus";
import { GameLobbyState } from "./states/GameLobbyState";

export class GameLobbyRoom extends Room {
    onCreate (options: any) {
        this.setState(new GameLobbyState());
        console.log("GameLobbyRoom created!", options);
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