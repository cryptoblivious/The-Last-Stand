//  Nom du fichier : MatchOrchestrator.ts
//  Contexte : Classe héritant de la classe Room de colyseus pour gérer les connections au matchmaker à partir du gameLobby
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://colyseus.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 


import { Room , Client, matchMaker} from "colyseus";
import { GameLobbyState } from "./states/GameLobbyState";
export class GameLobbyRoom extends Room {
    
    onCreate (options: any) {
        this.setState(new GameLobbyState());
        console.log("GameLobbyRoom created!", options);
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