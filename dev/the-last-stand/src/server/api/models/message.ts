//  Nom du fichier : message.ts
//  Contexte : Un fichier de type TypeScript qui permet de définir le schéma d'un objet de type Message dans la base de données MongoDB
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

import { Schema, model } from 'mongoose';

export const messageSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      match: /^([\wÀ-ÖØ-öø-ÿ]+\s)*[\wÀ-ÖØ-öø-ÿ]+$(?<!^guest$)/,
    },
    userNo: {
      type: String,
      required: true,
      match: /^\d{4}$/,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ userId: 1 }, { unique: false } as any);

export const messageModel = model('Message', messageSchema);
