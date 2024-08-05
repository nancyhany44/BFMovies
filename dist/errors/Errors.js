"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.DeletionError = exports.NotFoundError = exports.Errors = void 0;
class Errors extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.Errors = Errors;
class NotFoundError extends Errors {
    constructor(message = 'Not Found') {
        super(message);
    }
}
exports.NotFoundError = NotFoundError;
class DeletionError extends Errors {
    constructor(message = 'Deletion Error') {
        super(message);
    }
}
exports.DeletionError = DeletionError;
class ValidationError extends Errors {
    constructor(message = 'Validation Error') {
        super(message);
    }
}
exports.ValidationError = ValidationError;
