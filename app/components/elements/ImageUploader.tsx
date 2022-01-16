import { Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { storagePaths } from "../../const/firestore";
import {
  delteTemporaryImage,
  getImageLink,
  uploadTemporaryFile,
} from "../../utils/firebase/storage";
import LoadingButton from "@mui/lab/LoadingButton";
import styled from "styled-components";
interface ImageUploaderProps {
  buttonText?: string;
  setImage: (s: string) => void;
  inputId: string;
}

const MyStack = styled(Stack)`
  && {
    margin-bottom: 1rem;
  }
`;

const ImageUploader = ({
  setImage,
  buttonText = "Upload an image",
  inputId,
}: ImageUploaderProps) => {
  // made it so clena this up
  const defaulText = "";

  const [text, setText] = useState(defaulText);
  const [imageUpload, setImageUpload] = useState(false);
  const { images } = storagePaths;
  // we stroe locally image id, we use it do delete it froem db when we upload a new image
  const [imageId, setImageId] = useState<string | null>(null);
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
        if (imageId !== null) {
          delteTemporaryImage(imageId, images);
          // remvoe prevoius im
        }
        setText("");
        setImageId(res.data);
        const newSrc = await getImageLink(res.data, images);
        setImage(newSrc);
      }
    }
  };
  const inputRef = useRef<any>(null);
  return (
    <MyStack alignItems="center" spacing={1} justifyContent="center">
      <LoadingButton
        component="label"
        htmlFor={inputId}
        loading={imageUpload}
        loadingIndicator=""
        loadingPosition="end"
        variant="contained"
        // tabIndex={false}
        onFocus={() => {
          inputRef?.current?.focus()
        }}
      >
        <input
          accept="image/*"
          className=""
          style={{ width: 0, height: 0 }}
          id={inputId}
          type="file"
          ref={inputRef}
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
          onFocus={() => {
            console.log("???");
          }}
        />
        {imageUpload ? "Loading..." : buttonText}
      </LoadingButton>
      <Typography color={text === defaulText ? "black" : "red"}>
        {text}
      </Typography>
    </MyStack>
  );
};

export default ImageUploader;
