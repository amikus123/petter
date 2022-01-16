import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { capitalizeFirstLetter,camelToSplit } from "../../utils/generealFunctions";
import { HumanForm, PetForm } from "../../atoms/signup";
import styled from "styled-components";
import { FormOption } from "../Pages/signup/SignupForm";

const MyStack = styled(Stack)`
  width: 100%;
`;
interface SingInForm {
  formOptions: FormOption[];
  formValues:PetForm | HumanForm;
  setValues:(arg: HumanForm | PetForm) => void;
}
const SignInForm = ({ formOptions,formValues,setValues }: SingInForm) => {
  const handleChange = (name: keyof HumanForm, val: string) => {
    const newVal = { ...formValues };
    newVal[name] = val;
    setValues(newVal);
  };
  return (
    <MyStack spacing={2}>
      {formOptions.map((item, index) => {
        const { valueName } = item
        if (item.options) {
          return (
            <FormControl component="fieldset"  key={index}>
              <FormLabel component="legend"  >{capitalizeFirstLetter(valueName)} </FormLabel>
              <RadioGroup
              
                aria-label={valueName}
                value={formValues[valueName]}
                onChange={(e) => {
                  handleChange(valueName, e.target.value);
                }}
                name={valueName}

              >
                {item.options.map((item, index) => {
                  return (
                    <FormControlLabel

                      value={item}
                      id={item}
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
              label={camelToSplit(valueName)}
              value={formValues[valueName]}
              onChange={(e) => {
                handleChange(valueName, e.target.value);
              }}
            />
          );
        }
      })}

   
    </MyStack>
  );
};

export default SignInForm;
