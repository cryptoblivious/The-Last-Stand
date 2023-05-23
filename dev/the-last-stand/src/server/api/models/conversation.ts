//  Nom du fichier : conversations.ts
//  Contexte : Un fichier de type TypeScript qui permet de définir le schéma de la collection conversations dans la base de données MongoDB
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

import { Schema, model } from 'mongoose';
import { messageSchema } from './message';

export const conversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userIds: {
      type: [String],
      required: true,
    },
    messages: {
      type: [messageSchema],
      required: true,
      default: [],
    },
    isGlobal: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const conversationModel = model('Conversation', conversationSchema);
