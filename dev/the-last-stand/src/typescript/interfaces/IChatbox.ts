import { IUser } from './IUser';
import { IMessage } from './IMessage';

export interface IChatbox {
  users?: IUser[];
  messages?: IMessage[];
  icon?: string;
}
