import { StatusCode } from "../utils/consts";
import { BaseCustomError } from "./base-custom-error";

export default class DuplicateError extends BaseCustomError {
  constructor(message: string) {
    super(message, StatusCode.Conflict);

    Object.setPrototypeOf(this, DuplicateError.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }
 
}
