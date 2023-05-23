//  Nom du fichier : IUpdateSpriteMessage.ts
//  Contexte : interface pour mettre à jour les sprites dans le state du matchorchestrator (utilisé dans le match-canvas et match orchestrator)
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski

export interface IUpdateSpriteMessage {
  x: number;
  y: number;
  direction?: string;
  anim?: string;
}
