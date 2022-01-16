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

// * used in contenxt to simulate type, this is nevet called in actual code
export const createPromise = async (): Promise<BaseResposne> => {
  function x() {
    var promise = new Promise(function (resolve, reject) {
      window.setTimeout(function () {
        resolve("doddne!");
      });
    });
    return promise;
  }
  let res: any = await x;
  res = res as unknown as Promise<BaseResposne>;
  return res;
};

export const capitalizeFirstLetter = (str:string)  =>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const camelToSplit = (str:string)  =>{

  const filteredText = str.match(/([A-Z]?[^A-Z]*)/g) || []
  return capitalizeFirstLetter(filteredText.slice(0,-1).join(" "))

}