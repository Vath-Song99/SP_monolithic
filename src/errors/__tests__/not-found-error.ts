import { StatusCode } from "@scm/utils/consts";
import NotFoundError from "../not-found-error";


describe('NotFoundError', () => {
  it('should instantiate correctly with default status code', () => {
    const errorMessage = 'Not found error';

    const error = new NotFoundError(errorMessage);

    expect(error instanceof NotFoundError).toBeTruthy();
    expect(error.message).toBe(errorMessage);
    expect(error.getStatusCode()).toBe(StatusCode.NotFound);
  });

  it('should instantiate correctly with custom status code', () => {
    const errorMessage = 'Not found error';
    const customStatusCode = 404;

    const error = new NotFoundError(errorMessage, customStatusCode);

    expect(error instanceof NotFoundError).toBeTruthy();
    expect(error.message).toBe(errorMessage);
    expect(error.getStatusCode()).toBe(customStatusCode);
  });

  it('should set the correct prototype', () => {
    const errorMessage = 'Not found error';

    const error = new NotFoundError(errorMessage);

    expect(Object.getPrototypeOf(error)).toBe(NotFoundError.prototype);
  });
});
