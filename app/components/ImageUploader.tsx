import { Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { storagePaths } from "../const/firestore";
import {
  delteTemporaryImage,
  getImageLink,
  uploadTemporaryFile,
} from "../utils/firebase/storage";
import LoadingButton from "@mui/lab/LoadingButton";
import styled from "styled-components";
interface ImageUploaderProps {
  setImageSrc: (s: string) => void;
  setPreviousImageId: (s: string) => void;
  previousImageId: string | null;
}

const MyStack = styled(Stack)`
 && {
  margin-bottom: 1rem;
   }  `;

const ImageUploader = ({
  setImageSrc,
  previousImageId,
  setPreviousImageId,
}: ImageUploaderProps) => {
  const defaulText = "Please upload profile image";
  const [text, setText] = useState(defaulText);
  const [imageUpload, setImageUpload] = useState(false);

  const { images } = storagePaths;
  const verifyFileSubmission = async (f: File) => {
    if (f.type.indexOf("image") === -1) {
      setText("File is not an image");
    } else if (f.size > 1000000) {
      setText("File is too big");
    } else {
      setImageUpload(true);

      const res = await uploadTemporaryFile(f, images);
      setImageUpload(false);

      if (res.error) {
        setText(res.data);
        // show error ot sth
      } else {
        if (previousImageId !== null) {
          delteTemporaryImage(previousImageId, images);
          // remvoe prevoius im
        }
        setText("");
        setPreviousImageId(res.data);
        const newSrc = await getImageLink(res.data, images);
        setImageSrc(newSrc);
      }
    }
  };

  return (
    <MyStack alignItems="center" spacing={1} justifyContent="center">
      <input
        accept="image/*"
        className=""
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={(e) => {
          const fileList = e?.target?.files;
          if (!fileList) {
            setText("Unexcpected error");
          } else if (fileList?.length > 1) {
            setText("Tried to upload too many files");
          } else if (fileList?.length === 0) {
            setText("You failed to upload a file");
          } else {
            const file: File = fileList[0];
            verifyFileSubmission(file);
          }
        }}
      />
      <label htmlFor="raised-button-file">
        <LoadingButton
          component="span"
          loading={imageUpload}
          loadingIndicator=""
          loadingPosition="end"
          variant="contained"
        >
          {imageUpload ? "Loading..." : "Upload an image"}
        </LoadingButton>
      </label>
      <Typography color={text === defaulText ? "black" : "red"}>
        {text}
      </Typography>
    </MyStack>
  );
};

export default ImageUploader;
