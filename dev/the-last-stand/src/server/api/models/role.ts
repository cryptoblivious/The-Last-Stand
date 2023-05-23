//  Nom du fichier : role.ts
//  Contexte : Un fichier de type TypeScript qui permet de définir le schéma de la collection Role dans la base de données MongoDB
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/

import { Schema, model } from 'mongoose';
import { IUser } from '../../../typescript/interfaces/IUser';

export const roleSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
      unique: true,
      reference: 'User',
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

roleSchema.index({ idUser: 1, role: 1 }, { unique: true } as any);

export const roleModel = model<IUser>('Role', roleSchema);
