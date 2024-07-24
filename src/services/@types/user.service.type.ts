import { IUser, IUserResponse } from "@SP/@types/user.type";

export interface IUserService {
  createUser({ username, email, age }: IUser): Promise<IUserResponse>;
  getUser(id: string): Promise<IUserResponse>;
}
