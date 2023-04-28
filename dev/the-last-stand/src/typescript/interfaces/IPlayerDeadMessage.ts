export interface IPlayerDeadMessage {
    id: string;
    explosionPosition : {x: number, y: number};
    respawnPosition? : {x: number, y: number};
}