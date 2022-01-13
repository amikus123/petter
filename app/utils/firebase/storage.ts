import { uuid } from "uuidv4";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { myStorage } from "./init";
import { returnResponse } from "../generealFunctions";
import { GenericResponse } from "../../types";
// retrun a code, so taht i can remove the image with the next upload
export const uploadTemporaryFile = async (
  f: File,
  location: string
): Promise<GenericResponse<string>> => {
  try {
    const randomName = uuid();
    const fileLocation = `${location}/${randomName}`;

    const storageRef = ref(myStorage, fileLocation);
    await uploadBytes(storageRef, f)
    console.log("uploaded a file")
    return returnResponse("uploaded a file", false, randomName);
  } catch (e) {
    const text = `Failed to upload a file: ${e}`;
    console.error(text);
    return returnResponse(text, true);
  }
};

export const getImageLink = async (fileName: string, location: string) => {
  try {
    const fileLocation = `${location}/${fileName}`;
    return await getDownloadURL(ref(myStorage, fileLocation));
  } catch (e) {
    const text = `Failed to upload a image: ${e}`;
    console.error(text);
    return "";
  }
};

export const delteTemporaryImage = async (
  fileName: string,
  location: string
): Promise<GenericResponse<string>> => {
  try {
    const fileLocation = `${location}/${fileName}`;
    const storageRef = ref(myStorage, fileLocation);
    await deleteObject(storageRef)    
    console.log("deleted a file");
    return returnResponse("Deleted a file");
  } catch (e) {
    const text = `Failed to upload a file: ${e}`;
    console.error(text);
    return returnResponse(text, true);
  }
};
