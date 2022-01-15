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


export const capitalizeFirstLetter = (str:string)  =>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const camelToSplit = (str:string)  =>{

  const filteredText = str.match(/([A-Z]?[^A-Z]*)/g) || []
  return capitalizeFirstLetter(filteredText.slice(0,-1).join(" "))

}