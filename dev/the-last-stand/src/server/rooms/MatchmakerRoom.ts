//  Nom du fichier : MatchMakerRoom.ts
//  Contexte : Classe héritant de la classe Room de colyseus pour gérer la file d'attente des joueurs. 
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://colyseus.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 



import { Room, Client } from "colyseus";
import { EMessage } from '../../typescript/enumerations/EMessage';
import HashMap from "../../utils/data_structures/HashMap";

interface QueuePlayer {
    id: string;
    joinTime: number;
    mmr?: number;
}
interface IMatchMakerOptions {
    username: string;
    userNo: number;
    gameMode: 'casual' | 'ranked';
    playerCount: 2 | 3 | 4;
    mmr?: number;
}
export class MatchmakerRoom extends Room {
    private queues: HashMap<string, QueuePlayer[]> = new HashMap();
    private maxPlayers: Record<string, number> = { '2': 2, '3': 3, '4': 4 }
    private roomIds: Set<string> = new Set();
    private debugMode = false; //toggle this to enter the game alone for testing

    onCreate(options: any) {
        console.log("MatchmakerRoom created!");
    }

    onJoin(client: Client, options: IMatchMakerOptions) {
        if (this.debugMode) {
            const roomID = this.generateRandomUID();
            client.send(EMessage.JoinGame, { roomID });
            return;
        }

        const queueKey = `${options.gameMode}-${options.playerCount}`;
        if (!this.queues.get(queueKey)) {
            this.queues.set(queueKey, []);
        }
        this.queues.get(queueKey)?.push({
            id: client.id,
            mmr: options.mmr ?? 0,
            joinTime: Date.now(),
        });
        this.tryMatchmake(queueKey);
    }

    onLeave(client: Client, consented: boolean) {
        for (const [key, queuePlayer] of this.queues){
            const index = queuePlayer.findIndex((player) => player.id === client.id);
            if (index !== -1) {
                queuePlayer.splice(index, 1);
                if (queuePlayer.length === 0) {
                    this.queues.delete(key);
                    console.log(`Player ${client.id} left queue ${key}`)
                }
                return;
            }
        }
        // this.waitingPlayers.delete(client.id);

    }

    private tryMatchmake(queueKey: string) {
        const queue = this.queues.get(queueKey);
        const maxPlayers = this.maxPlayers[queueKey.split('-')[1]];
        if (!queue) return;
        queue.sort((a, b) => a.mmr! - b.mmr! || a.joinTime - b.joinTime);

        let mmrRange = 10
        while (mmrRange <= 100) {
            for (let i = 0; i < queue.length; i++) {
                if (i + maxPlayers <= queue.length &&
                    ((queue[i + maxPlayers - 1].mmr! - queue[i].mmr!) <= mmrRange)) {
                    const players = queue.splice(i, maxPlayers);
                    const roomID = this.generateRandomUID();
                    players.forEach((player) => {
                        const index = this.clients.findIndex((client) => client.id === player.id);
                        this.clients[index].send(EMessage.JoinGame, { roomID });
                    });
                    return;
                }
            }
            mmrRange += 10;
        }
    }

    private generateRandomUID(): string {
        const roomId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);

        if (this.roomIds.has(roomId)) {
            return this.generateRandomUID();
        }
        this.roomIds.add(roomId);
        return roomId;
    }
}
