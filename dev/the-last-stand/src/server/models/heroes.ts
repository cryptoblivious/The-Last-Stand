import mongoose, { Document, Schema } from 'mongoose';


interface IHero extends Document {
    name: string;
    backstory: string;
}

export const heroSchema = new Schema({
    name: { type: String, required: true },
    backstory: { type: String, required: true },
});

export const HeroModel = mongoose.model<IHero>('Hero', heroSchema);
