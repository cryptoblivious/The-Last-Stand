//  Nom du fichier : IGameEntityMapper.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour mapper les entités du jeu
//  Nom des auteurs : Jonathan Robinson et Andrzej Wisniowski
//  Références : https://chat.openai.com/

interface IPosition {
  x: number;
  y: number;
}
export interface IGameEntityMapper {
  id: string;
  gameEntityType: string;
  position: IPosition;
  anim?: string | undefined;
  direction?: string;
  staticgroup?: Phaser.Physics.Arcade.StaticGroup[];
  playerName ? : string;
}
