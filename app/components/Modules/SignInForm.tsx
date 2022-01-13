import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { species } from "../../const/general";
import { capitalizeFirstLetter } from "../../utils/generealFunctions";
import { useRecoilState, useRecoilValue } from "recoil";
import { SignInInterface } from "../../atoms/signup";
import { signFormAtom } from "../../../app/atoms/signup";
import styled from "styled-components";
import { FormOption } from "../signin/PetForm";

const MyStack = styled(Stack)`
  width: 100%;
`;
interface SingInForm {
  formOptions: FormOption[];
}
const SignInForm = ({ formOptions }: SingInForm) => {
  const [signFormState, setSignFormState] = useRecoilState(signFormAtom);
  const handleChange = (name: keyof SignInInterface, val: string) => {
    const newVal = { ...signFormState };
    newVal[name] = val;
    setSignFormState(newVal);
  };
  return (
    <MyStack spacing={2}>
      {JSON.stringify(formOptions)}
      {formOptions.map((item, index) => {
        const { valueName } = item;
        if (item.options) {
          return (
            <FormControl component="fieldset" key={index}>
              <FormLabel component="legend">Species</FormLabel>
              <RadioGroup
                aria-label="species"
                value={signFormState[valueName]}
                onChange={(e) => {
                  handleChange(valueName, e.target.value);
                }}
                // defaultValue={item.default}
                name="radio-buttons-group"
              >
                {item.options.map((item, index) => {
                  return (
                    <FormControlLabel
                      value={item}
                      control={<Radio />}
                      label={capitalizeFirstLetter(item)}
                      key={index}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          );
        } else {
          return (
            <TextField
              key={index}
              fullWidth
              id={valueName}
              name={valueName}
              label={valueName}
              value={signFormState[valueName]}
              onChange={(e) => {
                handleChange(valueName, e.target.value);
              }}
            />
          );
        }
      })}

      {/* <TextField
        fullWidth
        id="nick"
        name="nick"
        label="Nick"
        value={signFormState.nick}
        onChange={(e) => {
          handleChange("nick", e.target.value);
        }}
      />
      <TextField
        fullWidth
        id="bio"
        name="bio"
        label="Bio"
        value={signFormState.bio}
        onChange={(e) => {
          handleChange("bio", e.target.value);
        }}
      /> */}
      {/* <FormControl component="fieldset">
        <FormLabel component="legend">Species</FormLabel>
        <RadioGroup
          aria-label="species"
          value={signFormState.species}
          onChange={(e) => {
            handleChange("species", e.target.value);
          }}
          defaultValue={signFormState.species}
          name="radio-buttons-group"
        >
          {species.map((item, index) => {
            return (
              <FormControlLabel
                value={item}
                control={<Radio />}
                label={capitalizeFirstLetter(item)}
                key={index}
              />
            );
          })}
        </RadioGroup>
      </FormControl> */}
    </MyStack>
  );
};

export default SignInForm;
