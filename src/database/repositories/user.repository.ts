import { IUser, IUserResponse } from "@SP/@types/user.type";
import { IUserRepository } from "../@types/repository.type";
import { AppDataSource } from "..";
import { ApiError } from "@SP/errors/api-error";
import { BaseCustomError } from "@SP/errors/base-custom-error";
import { logger } from "@SP/utils/logger";

export class UserRepository implements IUserRepository {
  private static instance: UserRepository;
  private UserModel;

  private constructor() {
    const appData = AppDataSource.getInstance();
    this.UserModel = appData.getUserRepository();
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  public async create({ username, email, age }: IUser): Promise<IUserResponse> {
    try {
      const newUser = this.UserModel.create({
        username,
        email,
        age,
      });

      if (!newUser) {
        throw new ApiError("Can't create user!");
      }

      await this.UserModel.save(newUser); // Ensure new user is saved to the database

      return newUser;
    } catch (error: unknown) {
      if (error instanceof BaseCustomError) {
        throw error;
      }
      logger.error(
        `Unexpected error accurred while creating new user! ${error}`
      );
      throw new ApiError("Unexpected error accurred!");
    }
  }

  public async findOne(id: string): Promise<IUserResponse> {
    try {
      const user = await this.UserModel.findOne({
        where: { id: id },
        relations: [], // Specify if there are any relations to load
      });

      if (!user) {
        throw new ApiError(`User with id ${id} not found!`);
      }

      return user;
    } catch (error: unknown) {
      if (error instanceof BaseCustomError) {
        throw error;
      }
      logger.error(
        `Unexpected error accurred while finding new user! ${error}`
      );
      throw new ApiError("Unexpected error accurred!");
    }
  }
}
