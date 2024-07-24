import { IUser, IUserResponse } from "@SP/@types/user.type";

export interface IUserRepository {
  create({ username, email, age }: IUser): Promise<IUserResponse>;
  findOne(id: string): Promise<IUserResponse>;
}
