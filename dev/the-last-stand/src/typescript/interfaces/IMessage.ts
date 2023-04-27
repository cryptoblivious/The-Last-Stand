import { IUser } from './IUser';

export interface IMessage {
  _id?: string;
  emitter?: IUser;
  content?: string;
  emittedAt?: Date | string;
}
