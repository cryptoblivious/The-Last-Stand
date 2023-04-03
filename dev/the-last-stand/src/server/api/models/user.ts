import { Schema, model } from 'mongoose';

export const userSchema = new Schema(
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
      match: /^(\w+\s)*\w+$/,
    },
    userNo: {
      type: String,
      required: true,
      match: /^\d{4}$/,
    },
    title: {
      type: String,
    },
    avatar: {
      type: String,
    },
    lastOnline: {
      type: Schema.Types.Mixed, // Date or 'now'
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 1, userNo: 1 }, { unique: true } as any); // create a compound index on username and userNo fields

export const userModel = model('User', userSchema);
