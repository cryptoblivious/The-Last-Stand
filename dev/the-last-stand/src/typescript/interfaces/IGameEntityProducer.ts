//  Nom du fichier : IGameEntityProducer.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les producteurs d'entités de jeu.
//  Nom de l'auteur : Jonathan Robinson et Andrzej Wisniowski
//  Références : https://chat.openai.com/

import CGameEntity from '../../typescript/classes/CGameEntity';

export interface IGameEntityProducer {
  (position: { x: number; y: number }): CGameEntity;
}
