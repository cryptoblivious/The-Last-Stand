//  Nom du fichier : INewHudPlayer.ts
//  Contexte : interface pour les infos des joueurs dans le hud utilisé dans les scene match-canvas et hud
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski


export default interface INewhudplayer {
    name: string;
    index : number;
    damagePercentage : number;
    lives : number;
}