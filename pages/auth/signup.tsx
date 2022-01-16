import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import {
  Avatar,
  Button,
  Container,
  Collapse,
  Hidden,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  HumanForm,
  humanSigninFormAtom,
  PetForm,
  petSigninFormAtom,
  signFormSelector,
} from "../../app/atoms/signup";
import SignupForm, {
  SigninFormNames,
} from "../../app/components/Pages/signup/SignupForm";
import BackIcon from "@mui/icons-material/ArrowBack";

interface SignInProps {
  providers: any[];
}

const MyContainer = styled(Container)`
  height: 100vh;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface FormSchema {
  imgDefault: string;
  uploadButtonText: string;
  buttonText: string;
  formValues: HumanForm | PetForm;
  formState: boolean;
  setImage: (s: string) => void;
  handleButtonClick: () => void;
  setValues: (arg: HumanForm | PetForm) => void;
}
const SignIn = ({ providers }: SignInProps) => {
  const [showPetForm, setShowPetForm] = useState(true);
  const [showHumanForm, setShowHumanForm] = useState(true);

  const [loading, setLoading] = useState(false);
  const [humanSignin, setHumanSignin] = useRecoilState(humanSigninFormAtom);
  const [petSignin, setPetSignin] = useRecoilState(petSigninFormAtom);
  const formStates = useRecoilValue(signFormSelector);

  useEffect(() => {
    setTimeout(() => {
      setShowHumanForm(!showPetForm);
    }, 150);
  }, [showPetForm]);
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
      setImage: (s: string) => {
        setPetSignin({ ...petSignin, image: s });
      },
      buttonText: "Continue",
      handleButtonClick: () => {
        setShowPetForm(false);
      },
      formState: formStates.isPetReady,
      setValues: setPetValues,
    },
    human: {
      imgDefault: "/defaultHuman.jpg",
      uploadButtonText: "Upload a pictrue of yourself",
      formValues: humanSignin,
      setImage: (s: string) => {
        setHumanSignin({ ...humanSignin, image: s });
      },
      buttonText: "Sign up with google",
      handleButtonClick: () => {
        setShowPetForm(true);
      },
      formState: formStates.isHumanReady,
      setValues: setHumanValues,
    },
  };

  const BackButton = () => {
    return (
      <IconButton aria-label="back">
        <BackIcon />
      </IconButton>
    );
  };

  return (
    <MyContainer>
      <Collapse in={showPetForm} collapsedSize={0}>
        {showPetForm && <SignupForm formSchema={schemas.pet} inputId="1" />}
      </Collapse>
      <Collapse in={showHumanForm} collapsedSize={0}>
        {!showPetForm && (
          <SignupForm
            formSchema={schemas.human}
            inputId="2"
            topChildren={<BackButton />}
          />
        )}
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
