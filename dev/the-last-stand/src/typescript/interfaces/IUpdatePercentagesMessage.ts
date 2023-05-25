//  Nom du fichier : IUpdatePercentagesMessage.ts
//  Contexte : interface pour la mise à jour des pourcentages de dégâts dans le hud utilisé dans les scene match-canvas et hud et dans le matchorchestrator
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski

export default interface IUpdatePercentagesMessage {
    containerKey: string;
    damagePercentage: number;
}