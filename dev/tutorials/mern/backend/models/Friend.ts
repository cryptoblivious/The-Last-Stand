import { Schema, model } from 'mongoose';

const friendSchema = new Schema(
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

const friendModel = model('Friend', friendSchema);

export default friendModel;
