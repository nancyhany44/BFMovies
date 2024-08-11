export class Errors extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends Errors {
  constructor(message: string = 'Not Found') {
    super(message);
  }
}

export class DeletionError extends Errors {
  constructor(message: string = 'Deletion Error') {
    super(message);
  }
}

export class ValidationError extends Errors {
  constructor(message: string = 'Validation Error') {
    super(message);
  }
}
