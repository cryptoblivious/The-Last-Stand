export interface IUser {
  _id: string;
  email: string;
  username: string;
  userNo: string;
  title?: string;
  avatar?: string;
  lastOnline: Date | string;
}
