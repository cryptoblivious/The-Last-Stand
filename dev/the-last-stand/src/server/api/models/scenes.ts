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