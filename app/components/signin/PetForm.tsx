import { Stack, Avatar, Collapse } from "@mui/material";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  signFormAtom,
  signFormSelector,
  SignInInterface,
} from "../../atoms/signup";
import { genders, species } from "../../const/general";
import ImageUploader from "../ImageUploader";
import SignInForm from "../Modules/SignInForm";
export interface FormOption {
  valueName: keyof SignInInterface;
  default: string;
  options?: string[];
}

const getFormOptions = (
  obj: SignInInterface,
  prefix: "pet" | "human" | "" = ""
): FormOption[] => {
  const formOptions: FormOption[] = [];
  const xd =  Object.entries(obj)
  console.log(xd,"XDDDD")
  Object.entries(obj).map((item) => {
    const  [key, value] = item;
    const newKey = key as keyof SignInInterface
    console.log(newKey,value,"KEY")
    if (newKey.indexOf(prefix) === 0 && newKey.indexOf("ImageId") === -1) {
      if (newKey.indexOf("Gender") != -1) {
        formOptions.push({valueName:newKey,default:genders[0],options:genders})
      } else if (newKey.indexOf("Species") != -1) {
        formOptions.push({valueName:newKey,default:species[0],options:species})

      } else {
        formOptions.push({valueName:newKey,default:""})

      }
    }
  });
  return formOptions;
};

const PetForm = () => {
  const [signFormState, setSignFormState] = useRecoilState(signFormAtom);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showForm, setShowFomr] = useState(false);
  const formState = useRecoilValue(signFormSelector);

  return (
    <div>
      {JSON.stringify(formState)}
      <Stack alignItems="center" spacing={2} justifyContent="center">
        {/* <SignInForm /> */}
        <Avatar
          src={imageSrc ?? "/defaultPic.jpg"}
          alt="Uploaded image"
          sx={{ width: 144, height: 144 }}
        />
        <ImageUploader
          setImageSrc={(s: string) => {
            setImageSrc(s);
          }}
          previousImageId={signFormState.petImageId}
          setPreviousImageId={(s) => {
            setShowFomr(true);
            console.log(1);
            setSignFormState({ ...signFormState, petImageId: s });
          }}
        />
        {JSON.stringify(signFormState)}
      </Stack>
      <Collapse in={showForm}>
        <SignInForm formOptions={getFormOptions(signFormState,"pet")} />
      </Collapse>
    </div>
  );
};

export default PetForm;
