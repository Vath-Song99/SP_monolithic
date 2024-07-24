

export class BaseCustomError extends Error {
    protected statusCode: number;
    constructor(message: string , statusCode: number){
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, BaseCustomError.prototype)
    };
    getStatusCode(): number {
        return this.statusCode;
      }
  
}