import { Schema, model } from 'mongoose';
import { messageSchema } from './message';
import { userSchema } from './user';

export const conversationSchema = new Schema(
  {
    usersIds: {
      type: [userSchema],
      required: true,
      unique: false,
    },
    messages: {
      type: [messageSchema],
      required: true,
      unique: false,
    },
    isGlobal: { type: Boolean, default: false, unique: false },
  },
  {
    timestamps: true,
  }
);

export const conversationModel = model('Conversation', conversationSchema);
