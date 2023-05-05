import { Schema, model } from 'mongoose';

export const messageSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      match: /^([\wÀ-ÖØ-öø-ÿ]+\s)*[\wÀ-ÖØ-öø-ÿ]+$(?<!^guest$)/,
    },
    userNo: {
      type: String,
      required: true,
      match: /^\d{4}$/,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//messageSchema.index({ userId: 1 }, { unique: false } as any); // create anindex on the userId field

export const messageModel = model('Message', messageSchema);
