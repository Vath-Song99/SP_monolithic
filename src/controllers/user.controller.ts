import { Routes } from "@SP/routes";
import { UserService } from "@SP/services/user.service";
import { Route, Post, Body, Get, Path } from "tsoa";
import { IUserController } from "./@types/user.controller.type";

@Route(Routes.BASE)
export class UserController implements IUserController {
  private readonly userService: UserService;

  private constructor() {
    this.userService = UserService.getInstance();
  }

  @Post(Routes.CREATE_USER)
  public async createUser(
    @Body() user: { username: string; email: string; age: number }
  ): Promise<{
    data: { id: string; username: string; email: string; age: number };
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
    data: { id: string; username: string; email: string; age: number };
  }> {
    try {
      const user = await this.userService.getUser(id);

      return { data: user };
    } catch (error: unknown) {
      throw error;
    }
  }
}
