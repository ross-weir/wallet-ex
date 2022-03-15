import { CustomError } from 'ts-custom-error';

export class FileSystemError extends CustomError {}

export class ValidationError extends CustomError {}

export class DigestMismatchError extends ValidationError {
  constructor(
    public readonly expected: string,
    public readonly actual: string,
    message?: string,
  ) {
    super(message);
  }
}
