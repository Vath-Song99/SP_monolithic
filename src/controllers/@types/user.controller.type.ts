import { IUser, IUserResponse } from "@SP/@types/user.type";

export interface IUserController {
  createUser(user: IUser): Promise<{ data: IUserResponse }>;
  getUser(id: string): Promise<{ data: IUserResponse }>;
}
