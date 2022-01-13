import React, { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Avatar, Button, Container, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import ImageUploader from "../../app/components/ImageUploader";
import styled from "styled-components";
import SignInForm from "../../app/components/Modules/SignInForm";
import { useRecoilState } from "recoil";
import { signFormAtom } from "../../app/atoms/signup";
import SendIcon from "@mui/icons-material/Send";
import GoogleIcon from "@mui/icons-material/Google";
import PetForm from "../../app/components/signin/PetForm";
interface SignInProps {
  providers: any[];
}

const MyContainer = styled(Container)`
  height: 100vh;
  max-width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignIn = ({ providers }: SignInProps) => {
  const [signFormState, setSignFormState] = useRecoilState(signFormAtom);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
  }
  return (
    <MyContainer>
      {/* <Stack alignItems="center" spacing={2} justifyContent="center">
        <Avatar
          src={imageSrc ?? "/defaultPic.jpg"}
          alt="Uploaded image"
          sx={{ width: 144, height: 144 }}
        />
        <ImageUploader
          setImageSrc={(s: string) => {
            setImageSrc(s);
          }}
          previousImageId={signFormState.imageId}
          setPreviousImageId={(s) => {
            setSignFormState({ ...signFormState, imageId: s });
          }}
        />

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <LoadingButton
              onClick={() => {
                handleClick();
                signIn(provider.id, { callbackUrl: "/" });
              }}
              startIcon={<GoogleIcon />}
              loading={loading}
              loadingIndicator=""
              loadingPosition="start"
              variant="contained"
              color="primary"
            >
              {loading ? "Loading..." : "Sign up with Google"}
            </LoadingButton>
          </div>
        ))}
      </Stack> */}
      <PetForm/>
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
