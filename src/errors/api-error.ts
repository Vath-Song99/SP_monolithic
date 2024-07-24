import { StatusCode } from "@SP/utils/consts";
import { BaseCustomError } from "./base-custom-error";

export class ApiError extends BaseCustomError {
  constructor(
    message: string,
    statusCode: number = StatusCode.InternalServerError
  ) {
    super(message, statusCode);

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}
