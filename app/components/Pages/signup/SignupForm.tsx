import { Stack, Button, Avatar, Collapse, Container,Zoom  } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { FormSchema } from "../../../../pages/auth/signup";
import { HumanForm, PetForm } from "../../../atoms/signup";
import { genders, species } from "../../../const/general";
import ImageUploader from "../../elements/ImageUploader";
import SignInForm from "../../modules/SignInForm";
export interface FormOption {
  valueName: keyof (HumanForm | PetForm);
  default: string;
  options?: string[];
}
export type SigninFormNames = "pet" | "human" | "";
const getFormOptions = (obj: HumanForm | PetForm): FormOption[] => {
  const formOptions: FormOption[] = [];
  Object.entries(obj).map((item) => {
    const [key, value] = item;
    const newKey = key as keyof (HumanForm | PetForm);
    console.log(newKey, value, "KEY");
    if (newKey.indexOf("image") === -1) {
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

const ButtonContainer = styled(Container)`
  margin-top: 0.5rem;
  wdith: 100%;
  display: flex;
  justify-content: center;

`
const MyButton = styled(Button)`
text-align:center;`
interface PetFormProps {
  formSchema: FormSchema;
  inputId: string;
  topChildren?:React.ReactNode
}
const SignupForm = ({ formSchema, inputId,topChildren }: PetFormProps) => {
  const [showForm, setShowFomr] = useState(false);
  const {
    buttonText,
    handleButtonClick,
    imgDefault,
    uploadButtonText,
    formValues,
    formState,
    setValues,
    setImage,
  } = formSchema;
  return (
    <div>
      {topChildren}
      <Stack alignItems="center" spacing={2} justifyContent="center">
        <Avatar
          src={formValues.image ?? imgDefault}
          alt="Uploaded image"
          sx={{ width: 144, height: 144 }}
        />
        <ImageUploader
          buttonText={uploadButtonText}
          setImage={(s: string) => {
            setImage(s);
            setShowFomr(true);
          }}
          inputId={inputId}
        />
      </Stack>
      <Collapse in={showForm}>
        <SignInForm
          formOptions={getFormOptions(formValues)}
          formValues={formValues}
          setValues={setValues}
        />
      </Collapse>
      <ButtonContainer>
        <Zoom in={formState && showForm}>
          <MyButton variant="contained" onClick={handleButtonClick} >
            {buttonText}
          </MyButton>
        </Zoom>
      </ButtonContainer>
    </div>
  );
};

export default SignupForm;
