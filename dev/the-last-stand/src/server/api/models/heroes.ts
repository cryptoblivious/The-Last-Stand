//  Nom du fichier : heroes.ts
//  Contexte : Shema servant de structure pour aller chercher les heros et leurs backstories dans la base de données
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski

import { Document, Schema, model } from 'mongoose';


interface IHero extends Document {
    name: string;
    backstory: string;
}

const heroSchema = new Schema({
    name: { type: String, required: true },
    backstory: { type: String, required: true },
}, {
    collection: 'heroes' // Spécifiez le nom de la collection ici
});

export const HeroModel = model<IHero>('Hero', heroSchema);
