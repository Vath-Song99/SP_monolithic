import { BaseCustomError } from "../base-custom-error";

describe('BaseCustomError', () => {
  it('should instantiate correctly with status code', () => {
    const errorMessage = 'Test error';
    const statusCode = 500;

    const error = new BaseCustomError(errorMessage, statusCode);

    expect(error instanceof BaseCustomError).toBeTruthy();
    expect(error.message).toBe(errorMessage);
    expect(error.getStatusCode()).toBe(statusCode);
  });

  it('should set the correct prototype', () => {
    const errorMessage = 'Test error';
    const statusCode = 500;

    const error = new BaseCustomError(errorMessage, statusCode);

    expect(Object.getPrototypeOf(error)).toBe(BaseCustomError.prototype);
  });
});
