'use client';

import { emailValid } from "@/lib/validations";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function SignIn() {

  const [emailValue, setEmailValue] = useState('');
  const [pwdValue, setPwdValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function trySignIn() {
    try {
      await signIn('Credentials', {
        email: emailValue,
        password: pwdValue,
        redirect: true,
        callbackUrl: '/main'
      });
    }
    catch (error){
      console.log(error);
    }
  }

  return (
    <FormControl required>
      {!emailValid(emailValue) && <FormHelperText>Please provide a valid email address.</FormHelperText>}
      <TextField 
        id='signup-form-email' 
        type='email'
        value={emailValue}
        onChange={x => {setEmailValue(x.target.value);}}
      />
      <Input 
        id='signin-form-password' 
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
        // disabled={!emailValid(emailValue)}
        variant="contained"
        onClick={() => trySignIn()}
      >
        Sign in
      </Button>
  </FormControl>)
}