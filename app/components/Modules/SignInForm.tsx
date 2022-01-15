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
import { FormOption } from "../signin/SignupForm";

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
            <FormControl component="fieldset" key={index}>
              <FormLabel component="legend">Species</FormLabel>
              <RadioGroup
                aria-label="species"
                value={formValues[valueName]}
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
