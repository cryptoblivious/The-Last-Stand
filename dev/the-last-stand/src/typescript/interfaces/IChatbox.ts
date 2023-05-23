//  Nom du fichier : IChatbox.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les chatbox
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

import { IUser } from './IUser';
import { IMessage } from './IMessage';

export interface IChatbox {
  users?: IUser[];
  messages?: IMessage[];
  icon?: string;
}
