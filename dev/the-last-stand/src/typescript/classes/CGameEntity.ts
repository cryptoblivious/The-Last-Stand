//  Nom du fichier : CGameEntity.ts
//  Contexte : classe servant à stocker les données des entités du jeu devant être sérialisées par colyseus dans le shared state 
//  Nom des auteurs : Jonathan Robinson et Andrzej Wisniowski
//  Références : https://chat.openai.com/ - https://colyseus.io/ - https://www.youtube.com/watch?v=5HESa0Ibq8E 

import { Schema, type } from '@colyseus/schema';
export default class CGameEntity extends Schema {
  @type('number') id: number;
  @type('string') name: string;
  @type({ map: 'number' }) position: { x: number; y: number };
  @type({ map: 'number' }) size: { width: number; height: number };
  damagePercentage: number;

  constructor({ id, name, position, size }: { id: number; name: string; position: { x: number; y: number }; size: { width: number; height: number } }) {
    super();
    this.id = id;
    this.name = name;
    this.position = position;
    this.size = size;
    this.damagePercentage = 0;
  }
}
