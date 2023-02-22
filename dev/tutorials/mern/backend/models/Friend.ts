import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    