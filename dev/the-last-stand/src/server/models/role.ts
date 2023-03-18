import { Schema, model } from 'mongoose';
import { IUser } from '../../typescript/interfaces/IUser';

export const roleSchema = new Schema(
  {
    idUser: {
      type: String,
      required: true,
      unique: true,
      reference: 'User',
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

roleSchema.index({ idUser: 1, role: 1 }, { unique: true } as any);

export const roleModel = model<IUser>('Role', roleSchema);
