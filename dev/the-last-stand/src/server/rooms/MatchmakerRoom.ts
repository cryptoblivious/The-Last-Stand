// MatchmakerRoom.ts
import { Room, Client } from "colyseus";
import { EMessage } from '../../typescript/enumerations/EMessage';

export class MatchmakerRoom extends Room {
    // waitingPlayers: Set<string> = new Set();
    private queue: string[] = [];
    private maxPlayers: number = 1;
    private roomIds: Set<string> = new Set();

    onCreate(options: any) {
        console.log("MatchmakerRoom created!");
    }

    onJoin(client: Client, options: any) {
        console.log("Client joined MatchmakerRoom" + client.id + "with options" + options.username);
        if (!this.queue.includes(client.id)) {
            this.queue.push(client.id);
        }

        if (this.queue.length >= this.maxPlayers) {
            // splice maxPlayers from queue
            const playersIds = this.queue.splice(0, this.maxPlayers);
            const roomId = this.genereateRandomUID();
            playersIds.forEach(playerId => {
                const index = this.clients.findIndex((client) => client.id === playerId);
                this.clients[index].send(EMessage.JoinGame, { roomId: roomId });
            });
        }

        
        
        // if (!this.waitingPlayers.has(client.id)) 
        // {
        //     this.waitingPlayers.add(client.id);
        // }
        //     console.log("Waiting players: " + this.waitingPlayers.size);
        // if (this.waitingPlayers.size >= 1) { // Change this value for larger groups.
        //     this.broadcast(EMessage.JoinGame, { players: this.waitingPlayers });
        // }
    }

    onLeave(client: Client, consented: boolean) {
        console.log("Client left MatchmakerRoom");
        // this.waitingPlayers.delete(client.id);

    }

    genereateRandomUID(): string {
        const roomId =  Date.now().toString(36) + Math.random().toString(36).substring(2, 7);

        if (this.roomIds.has(roomId)) {
            return this.genereateRandomUID();
        }
        this.roomIds.add(roomId);
        return roomId;
    }
}
