//  Nom du fichier : INewHudPlayer.ts
//  Contexte : interface pour les infos des joueurs dans le hud utilisé dans les scene match-canvas et hud
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski

/**
 * Interface pour les infos des joueurs dans le hud utilisé dans les scene match-canvas et hud
 * @export
 * @interface INewhudplayer
 * @param {string} name - Nom du joueur
 * @param {string} id - Id du joueur
 * @param {number} index - Index du joueur
 * @param {number} [damagePercentage] - Pourcentage de dommage du joueur
 * @param {number} [lives] - Nombre de vie du joueur
    */
export default interface INewhudplayer {
    name: string;
    id: string;
    index : number;
    damagePercentage? : number;
    lives? : number;
}