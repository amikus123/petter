import { Button } from "@mui/material";
import React, { useState } from "react";
import { storagePaths } from "../const/firestore";
import {
  delteTemporaryImage,
  getImageLink,
  uploadTemporaryFile,
} from "../utils/firebase/storage";
const ImageUploader = () => {
  const [previousImageId, setPreviousImageId] = useState<string | null>(null);
  const [errorText, setErrorText] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { images } = storagePaths;
  const verifyFileSubmission = async (f: File) => {
    // check type, size
    if (f.type.indexOf("image") === -1) {
      setErrorText("File is not an image");
    } else if (f.size > 1000000) {
      setErrorText("File is too big");
    } else {
      const res = await uploadTemporaryFile(f, images);
      if (res.error) {
        // show error ot sth
      } else {
        if (previousImageId !== null) {
          delteTemporaryImage(previousImageId, images);
          setPreviousImageId(res.data);
          // remvoe prevoius im
        }
        const newSrc = await getImageLink(res.data, images);
        setImageSrc(newSrc);
      }
    }
  };
  return (
    <div>
      {imageSrc && <img src={imageSrc} alt="XD" />}
      {errorText}
      <input
        accept="image/*"
        className=""
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={(e) => {
          const fileList = e?.target?.files;
          if (!fileList) {
            setErrorText("Unexcpected error");
          } else if (fileList?.length > 1) {
            setErrorText("Tried to upload too many files");
          } else if (fileList?.length === 0) {
            setErrorText("You failed to upload a file");
          } else {
            const file: File = fileList[0];
            verifyFileSubmission(file);
          }
        }}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" className="">
          Upload
        </Button>
      </label>
    </div>
  );
};

export default ImageUploader;
