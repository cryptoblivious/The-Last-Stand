import { IUser } from './IUser';
import { IMessage } from './IMessage';

export interface IChatbox {
  _id: string;
  users?: IUser[];
  messages?: IMessage[];
  icon?: string;
}
