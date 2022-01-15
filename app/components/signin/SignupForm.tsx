import { Stack, Button, Avatar, Collapse } from "@mui/material";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { FormSchema } from "../../../pages/auth/signin";
import {
  HumanForm,
  PetForm,
} from "../../atoms/signup";
import { genders, species } from "../../const/general";
import ImageUploader from "../ImageUploader";
import SignInForm from "../Modules/SignInForm";
export interface FormOption {
  valueName: keyof (HumanForm | PetForm);
  default: string;
  options?: string[];
}
export type SigninFormNames = "pet" | "human" | "";
const getFormOptions = (
  obj: HumanForm | PetForm,
): FormOption[] => {
  const formOptions: FormOption[] = [];
  Object.entries(obj).map((item) => {
    const [key, value] = item;
    const newKey = key as  keyof (HumanForm | PetForm);
    console.log(newKey, value, "KEY");
    if (newKey.indexOf("imageId") === -1) {
      if (newKey.indexOf("gender") != -1) {
        formOptions.push({
          valueName: newKey,
          default: genders[0],
          options: genders,
        });
      } else if (newKey.indexOf("species") != -1) {
        formOptions.push({
          valueName: newKey,
          default: species[0],
          options: species,
        });
      } else {
        formOptions.push({ valueName: newKey, default: "" });
      }
    }
  });
  return formOptions;
};

const ButtonCollapse = styled(Collapse)`
  margin: 0 auto;
  wdith: 100%;
  display: flex;
  justify-content: center;
  margin-top:0.5rem;
`;
interface PetFormProps {
  formSchema: FormSchema;
}
const SignupForm = ({ formSchema }: PetFormProps) => {
  const [showForm, setShowFomr] = useState(false);
  const {
    buttonText,
    name,
    handleButtonClick,
    imgDefault,
    setPreviousImageId,
    uploadButtonText,
    formValues,
    formState,
    setValues
  } = formSchema;
  return (
    <div>
      <Stack alignItems="center" spacing={2} justifyContent="center">
        <Avatar
          src={formValues.imageId ?? imgDefault}
          alt="Uploaded image"
          sx={{ width: 144, height: 144 }}
        />
        <ImageUploader
          buttonText={uploadButtonText}
          setImageSrc={(s: string) => {
            setShowFomr(true);
          }}
          previousImageId={formValues.imageId}
          setPreviousImageId={(s) => {
            setShowFomr(true);
            setPreviousImageId(s);
          }}
        />
      </Stack>
      <Collapse in={showForm} >
        <SignInForm formOptions={getFormOptions(formValues)}  formValues={formValues} setValues={setValues}/>
      </Collapse>
      <ButtonCollapse in={formState && showForm} orientation="horizontal">
        <Button variant="contained" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </ButtonCollapse>
    </div>
  );
};

export default SignupForm;
