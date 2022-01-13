import { Tooltip, IconButton, Button,Theme } from "@mui/material";
import * as React from "react";


interface FormProps {
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

 const FaceForm: React.FunctionComponent<FormProps> = ({ saveFace }) => {

  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  const handleCapture = ({ target }: any) => {
    setSelectedFile(target.files[0]);
  };

  const handleSubmit = () => {
    saveFace(selectedFile);
  };

  return (
    <>
      <input
        accept="image/jpeg"
        className=""
        id="faceImage"
        type="file"
        onChange={handleCapture}
      />
      <Tooltip title="Select Image">
        <label htmlFor="faceImage">
         
        </label>
      </Tooltip>
      <label>{selectedFile ? selectedFile?.name : "Select Image"}</label>. . .
      <Button onClick={() => handleSubmit()} color="primary">
        Save
      </Button>
    </>
  );
};
export default FaceForm