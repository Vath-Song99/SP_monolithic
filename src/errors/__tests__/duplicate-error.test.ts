import { StatusCode } from "@scm/utils/consts";
import DuplicateError from "../duplicate-error";


describe('DuplicateError', () => {
  it('should instantiate correctly with default status code', () => {
    const errorMessage = 'Duplicate error';

    const error = new DuplicateError(errorMessage);

    expect(error instanceof DuplicateError).toBeTruthy();
    expect(error.message).toBe(errorMessage);
    expect(error.getStatusCode()).toBe(StatusCode.Conflict);
  });

  it('should set the correct prototype', () => {
    const errorMessage = 'Duplicate error';

    const error = new DuplicateError(errorMessage);

    expect(Object.getPrototypeOf(error)).toBe(DuplicateError.prototype);
  });
});
