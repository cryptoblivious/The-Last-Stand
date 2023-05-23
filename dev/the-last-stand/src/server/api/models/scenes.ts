//  Nom du fichier : scene.ts   
//  Contexte : Shema servant de structure pour aller chercher les scenes dans la base de données
//  Nom de l'auteur : Jonathan Robinson
//  Autres étudiants : Andrzej Wisniowski


import { Document, Schema, model } from 'mongoose';

interface IScene extends Document {
    name: string;
    description?: string;
}

const sceneSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
}, {
    collection: 'scenes' // Spécifiez le nom de la collection ici
});

export const SceneModel = model<IScene>('Scene', sceneSchema);