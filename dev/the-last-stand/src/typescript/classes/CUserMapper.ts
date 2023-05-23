//  Nom du fichier : CGameEntity.ts
//  Contexte : classe servant à stocker les données des entités du jeu devant être sérialisées par colyseus dans le shared state 
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

import { Schema, type } from '@colyseus/schema';

export class CUserMapper extends Schema {
  @type('string') _id?: string;
  @type('string') username?: string;
  @type('string') userNo?: string;
  @type('string') title?: string;
  @type('string') lastOnline?: string;
  @type('string') sessionId: string = '';
}
