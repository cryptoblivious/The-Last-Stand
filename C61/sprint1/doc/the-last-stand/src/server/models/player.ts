import { Schema, model } from 'mongoose';

export const playerSchema = new Schema(
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
    },
    userNo: {
      type: String,
      required: true,
      match: /^[0-9]{4}$/,
    },
    title: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      required: true,
    },
    lastOnline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const playerModel = model('Player', playerSchema);
