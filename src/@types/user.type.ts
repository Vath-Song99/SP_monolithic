export interface IUser {
  username: string;
  email: string;
  age: number;
}

export interface IUserResponse extends IUser {
  id: string;
}
