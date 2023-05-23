//  Nom du fichier : IMessageMapper.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les messages mapés
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

import { Schema, type } from '@colyseus/schema';

export class IMessageMapper extends Schema {
  @type('string') userId?: string = '';
  @type('string') username?: string = '';
  @type('string') userNo?: string = '';
  @type('string') content?: string = '';
}
