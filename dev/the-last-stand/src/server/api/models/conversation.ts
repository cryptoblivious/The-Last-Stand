import { Schema, model } from 'mongoose';
import { messageSchema } from './message';

export const conversationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userIds: {
      type: [String],
      required: true,
    },
    messages: {
      type: [messageSchema],
      required: true,
      default: [],
    },
    isGlobal: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const conversationModel = model('Conversation', conversationSchema);
