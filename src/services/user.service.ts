import { UserRepository } from "@SP/database/repositories/user.repository";
import { IUserService } from "./@types/user.service.type";
import { IUser, IUserResponse } from "@SP/@types/user.type";
import { BaseCustomError } from "@SP/errors/base-custom-error";
import { ApiError } from "@SP/errors/api-error";
import { logger } from "@SP/utils/logger";
import NotFoundError from "@SP/errors/not-found-error";
import { StatusCode } from "@SP/utils/consts";

export class UserService implements IUserService {
  private static instance: UserService;
  private readonly userRepo: UserRepository;

  private constructor() {
    this.userRepo = UserRepository.getInstance();
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async createUser({
    username,
    email,
    age,
  }: IUser): Promise<IUserResponse> {
    try {
      const newUser = await this.userRepo.create({ username, email, age });
      return newUser;
    } catch (error: unknown) {
      if (error instanceof BaseCustomError) {
        throw error;
      }
      logger.error(`Unexpected error accurred in createUser() ${error}`);
      throw new ApiError(`Unexpected error accurred!`);
    }
  }

  public async getUser(id?: string): Promise<IUserResponse> {
    try {
      if (!id) {
        throw new NotFoundError(`Invalid ID!`, StatusCode.BadRequest);
      }
      const user = await this.userRepo.findOne(id);

      return user;
    } catch (error: unknown) {
      if (error instanceof BaseCustomError) {
        throw error;
      }
      logger.error(`Unexpected error accurred in getUser() ${error}`);
      throw new ApiError(`Unexpected error accurred!`);
    }
  }
}
