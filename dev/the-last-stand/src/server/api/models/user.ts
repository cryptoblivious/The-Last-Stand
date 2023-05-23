//  Nom du fichier : user.ts
//  Contexte : Un fichier de type TypeScript qui permet de définir le schéma de la collection users dans la base de données MongoDB
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

import { Schema, model } from 'mongoose';

export const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
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
    title: {
      type: String,
    },
    avatar: {
      type: String,
    },
    lastOnline: {
      type: Schema.Types.Mixed,
      required: true,
    },
    activeConversationsIds: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 1, userNo: 1 }, { unique: true } as any); // create a compound index on username and userNo fields

export const userModel = model('User', userSchema);
