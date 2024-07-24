import { StatusCode } from "../utils/consts";
import { BaseCustomError } from "./base-custom-error";

export default class NotFoundError extends BaseCustomError {

  constructor(message: string , statusCode: number = StatusCode.NotFound) {
    
    super(message, statusCode)

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

}
