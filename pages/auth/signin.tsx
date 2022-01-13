import React from "react";
import { getProviders, signIn } from "next-auth/react";
import { imageConfigDefault } from "next/dist/server/image-config";
import { Button } from "@mui/material";
import  ImageUploader from "../../app/components/ImageUploader"
interface SignInProps {
  providers: any[];
}
const SignIn = ({ providers }: SignInProps) => {
    //
  return (
    //   form with name and image
    <>
    <ImageUploader/>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
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
