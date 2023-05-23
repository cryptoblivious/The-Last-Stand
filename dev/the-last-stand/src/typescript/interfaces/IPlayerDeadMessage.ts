//  Nom du fichier : IPlayerDeadMessage.ts
//  Contexte : interface pour les messages de mort des joueurs pour générer l'explosion et le respawn
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski

export interface IPlayerDeadMessage {
    id: string;
    explosionPosition : {x: number, y: number};
    respawnPosition? : {x: number, y: number};
}