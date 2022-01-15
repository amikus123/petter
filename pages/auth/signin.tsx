import React, { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Avatar, Button, Container, Collapse, Hidden } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import ImageUploader from "../../app/components/ImageUploader";
import styled from "styled-components";
import SignInForm from "../../app/components/Modules/SignInForm";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import {
  HumanForm,
  humanSigninFormAtom,
  PetForm,
  petSigninFormAtom,
  signFormSelector,
} from "../../app/atoms/signup";
import SendIcon from "@mui/icons-material/Send";
import GoogleIcon from "@mui/icons-material/Google";
import SignupForm, {
  SigninFormNames,
} from "../../app/components/signin/SignupForm";
import { connectStorageEmulator } from "@firebase/storage";
interface SignInProps {
  providers: any[];
}

const MyContainer = styled(Container)`
  height: 100vh;
  max-width: 80vw;
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`;

export interface FormSchema {
  imgDefault: string;
  uploadButtonText: string;
  setPreviousImageId: (s: string) => void;
  buttonText: string;
  handleButtonClick: () => void;
  name: SigninFormNames;
  formValues: HumanForm | PetForm;
  formState: boolean;
  setValues: (arg: HumanForm | PetForm) => void;
}
const SignIn = ({ providers }: SignInProps) => {
  const [showPetForm, setShowPetForm] = useState(true);
  const [loading, setLoading] = useState(false);

  const [humanSignin, setHumanSignin] = useRecoilState(humanSigninFormAtom);
  const [petSignin, setPetSignin] = useRecoilState(petSigninFormAtom);
  const formStates = useRecoilValue(signFormSelector);

  const setPetValues = (v: PetForm | HumanForm) => {
    const xd = v as PetForm;
    setPetSignin(xd);
  };
  const setHumanValues = (v: PetForm | HumanForm) => {
    const xd = v as HumanForm;
    setHumanSignin(xd);
  };
  const schemas: Record<string, FormSchema> = {
    pet: {
      imgDefault: "/defaultPet.jpg",
      uploadButtonText: "Upload a pictrue of your pet",
      formValues: petSignin,
      setPreviousImageId: (s: string) => {
        console.log("pet")
        setPetSignin({ ...petSignin, imageId: s });
      },
      buttonText: "Continue",
      handleButtonClick: () => {
        setShowPetForm(false);
      },
      formState: formStates.isPetReady,
      name: "pet",
      setValues: setPetValues,
    },
    human: {
      imgDefault: "/defaultHuman.jpg",
      uploadButtonText: "Upload a pictrue of yourself",
      formValues: humanSignin,
      setPreviousImageId: (s: string) => {
        console.log("human XDDDDDD")
        setHumanSignin({ ...humanSignin, imageId: s });
      },
      buttonText: "Sign up with google",
      handleButtonClick: () => {
        setShowPetForm(true);
      },
      formState: formStates.isHumanReady,
      name: "human",
      setValues: setHumanValues,
    },
  };
  function handleClick() {
    setLoading(true);
  }
  return (
    <MyContainer>
      {JSON.stringify([formStates,humanSignin,petSignin])}
      <Collapse in={showPetForm}  collapsedSize={0}  >
        <SignupForm formSchema={schemas.pet} />
        {/* {showPetForm && <SignupForm formSchema={schemas.pet} />} */}
      </Collapse>
      <Collapse in={!showPetForm } collapsedSize={0}>
        jjjj
        <SignupForm formSchema={schemas.human} />
        {/* {!showPetForm && <SignupForm formSchema={schemas.human} />} */}
      </Collapse>
    </MyContainer>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
export default SignIn;
