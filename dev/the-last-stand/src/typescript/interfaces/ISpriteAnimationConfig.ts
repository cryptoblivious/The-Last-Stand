//  Nom du fichier : ISpriteAnimationConfig.ts
//  Contexte : interface pour les détails relatifs aux animations des sprites phaser
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski

export default interface ISpriteAnimationConfig {
  key: string;
  path: string;
  frameWidth: number;
  frameHeight: number;
  startFrame: number;
  endFrame: number;
  frameRate: number;
  repeat: number;
  frameEvents?: number[];
}
