export interface BaseResposne {
  text: string;
  error: boolean;
}

export interface GenericResponse<T> extends BaseResposne {
  data: T | string;
}
