//  Nom du fichier : IMessage.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les messages.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

import { IUser } from './IUser';

export interface IMessage {
  _id?: string;
  emitter?: IUser;
  content?: string;
  emittedAt?: Date | string;
}
