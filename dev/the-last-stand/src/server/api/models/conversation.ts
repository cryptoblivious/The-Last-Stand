import { Schema, model } from 'mongoose';
import { messageSchema } from './message';
import { userSchema } from './user';

export const conversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    usersIds: {
      type: [userSchema],
      required: true,
    },
    messages: {
      type: [messageSchema],
      required: true,
    },
    isGlobal: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const conversationModel = model('Conversation', conversationSchema);
