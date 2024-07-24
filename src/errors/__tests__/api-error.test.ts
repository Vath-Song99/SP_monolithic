import { StatusCode } from '@scm/utils/consts';
import { ApiError } from '../api-error';

describe('ApiError', () => {
  it('should instantiate correctly with default status code', () => {
    const errorMessage = 'Test error';

    const error = new ApiError(errorMessage);

    expect(error instanceof ApiError).toBeTruthy();
    expect(error.message).toBe(errorMessage);
    expect(error.getStatusCode()).toBe(StatusCode.InternalServerError);
  });

  it('should instantiate correctly with custom status code', () => {
    const errorMessage = 'Test error';
    const statusCode = StatusCode.BadRequest;

    const error = new ApiError(errorMessage, statusCode);

    expect(error instanceof ApiError).toBeTruthy();
    expect(error.message).toBe(errorMessage);
    expect(error.getStatusCode()).toBe(statusCode);
  });

  it('should set the correct prototype', () => {
    const errorMessage = 'Test error';

    const error = new ApiError(errorMessage);

    expect(Object.getPrototypeOf(error)).toBe(ApiError.prototype);
  });
});
