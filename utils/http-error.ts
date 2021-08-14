export default class HttpError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }

  toString() {
    return this.message;
  }

  toJSON() {
    return {
      message: this.message,
      code: this.code,
    };
  }
}