import { validate } from "class-validator";
import { ValidationError } from "./error/errors";

export default async function RequestBodyValidation<T>(input: any) {
  const keys = Object.keys(input);
  for (const key of keys) {
    if (!isNaN(Number(input[key]))) input[key] = Number(input[key]);
  }
  const error = await validate(input, {
    ValidationError: { target: true },
  });

  if (error.length) {
    const ErrorField = Object.keys(error[0].constraints!);
    throw new ValidationError(error[0].constraints![ErrorField[0]]);
  }
  return input as T;
}
