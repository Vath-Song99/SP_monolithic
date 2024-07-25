import { Routes } from "@SP/routes";
import { UserService } from "@SP/services/user.service";
import { IUserController } from "./@types/user.controller.type";
import { IUser, IUserResponse } from "@SP/@types/user.type";
import { Body, Get, Path, Post, Route, SuccessResponse } from "tsoa";
import { StatusCode } from "@SP/utils/consts";

@Route("/api/v1")
export class UserController implements IUserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  @Post(Routes.CREATE_USER)
  @SuccessResponse(StatusCode.Created, "Created")
  public async createUser(@Body() user: IUser): Promise<{
    data: IUserResponse;
  }> {
    try {
      const newUser = await this.userService.createUser(user);
      return { data: newUser };
    } catch (error: unknown) {
      throw error;
    }
  }

  @Get(Routes.RETRIEVE_USER)
  public async getUser(@Path() id: string): Promise<{
    data: IUserResponse;
  }> {
    try {
      const user = await this.userService.getUser(id);

      return { data: user };
    } catch (error: unknown) {
      throw error;
    }
  }
}
