'use client';

import { emailValid } from "@/lib/validations";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment } from "@mui/material";
import React, { useState } from "react";

export default function SignUp() {

  const [emailValue, setEmailValue] = useState('');
  const [pwdValue, setPwdValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl required>
      {!emailValid(emailValue) && <FormHelperText>Please provide a valid email address.</FormHelperText>}
      <Input 
        id='signup-form-email' 
        type='email'
        value={emailValue}
        onChange={x => {setEmailValue(x.target.value);}}
      />
      <Input 
        id='signup-form-password' 
        type={showPassword ? 'text' : 'password'}
        value={pwdValue}
        onChange={x => {setPwdValue(x.target.value);}}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              size="small"
              aria-label="toggle password visibility"
              onClick={() => {setShowPassword(!showPassword);}}
              onMouseDown={x => {x.preventDefault();}}
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <Button 
        disabled={!emailValid(emailValue)}
        variant="contained"
      >
        Sign in
      </Button>
  </FormControl>)
}