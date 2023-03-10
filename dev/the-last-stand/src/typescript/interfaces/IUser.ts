export interface IUser {
  user: {
    _id: string;
    email: string;
    username: string;
    userNo: string;
    title?: string;
    avatar?: string;
    lastOnline: Date | string;
  };
}
