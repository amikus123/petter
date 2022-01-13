import { BaseResposne, GenericResponse } from "../types";

export const returnResponse= <T>(
  text: string,
  error: boolean = false,
  data:T|string = text,
): GenericResponse<T> => {
  return {
    text,
    data,
    error,
  };
};
