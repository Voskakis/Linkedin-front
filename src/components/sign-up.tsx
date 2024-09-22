'use client';

import { emailValid } from "@/lib/validations";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {

  const router = useRouter();
  const [firstname, setFirstnameValue] = useState('');
  const [lastname, setLastnameValue] = useState('');
  const [telephone, setTelephone] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [pwdValue, setPwdValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function tryRegister() {
    try {
      await axios.post('https://localhost:7164/api/Authenticate/Register', {
        email: emailValue,
        password: pwdValue,
        firstName: firstname,
        lastName: lastname,
        phoneNumber: telephone
      });
      const response = await signIn('Credentials', {
        redirect: false, email: emailValue, password: pwdValue
      });
      if (response?.ok) {
        router.push('/main');
      }
    }
    catch (error) {
      //TODO: show error message
      console.log(error);
    }
  }

  return (
    <FormControl required sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
      <TextField 
        id='signup-form-firstname' 
        type='text'
        value={firstname}
        label="First Name"
        onChange={x => {setFirstnameValue(x.target.value);}}
      />
      <TextField 
        id='signup-form-lastname' 
        type='text'
        value={lastname}
        label="Last Name"
        onChange={x => {setLastnameValue(x.target.value);}}
      />
      <TextField 
        id='signup-form-phone' 
        type='tel'
        value={telephone}
        label="Phone Number"
        onChange={x => {setTelephone(x.target.value);}}
      />
      {!emailValid(emailValue) && <FormHelperText>Please provide a valid email address.</FormHelperText>}
      <TextField 
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
        onClick={() => tryRegister()}
      >
        Register
      </Button>
  </FormControl>)
}