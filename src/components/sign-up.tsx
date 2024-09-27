'use client';

import { emailValid } from "@/lib/validations";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, TextField, Box, Typography, Stack } from "@mui/material";
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
        email: emailValue,
        password: pwdValue
      });
      if (response?.ok) {
        router.push('/main');
        router.refresh();
      } else {
        router.push('/error');
      }
    } catch (error) {
      console.log(error);
      // TODO: handle error
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 400,
        width: '100%',
        padding: '24px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
        borderRadius: '12px',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Create an Account
      </Typography>
      <Stack spacing={2}>
        <TextField 
          id='signup-form-firstname' 
          type='text'
          value={firstname}
          label="First Name"
          onChange={x => setFirstnameValue(x.target.value)}
          fullWidth
        />
        <TextField 
          id='signup-form-lastname' 
          type='text'
          value={lastname}
          label="Last Name"
          onChange={x => setLastnameValue(x.target.value)}
          fullWidth
        />
        <TextField 
          id='signup-form-phone' 
          type='tel'
          value={telephone}
          label="Phone Number"
          onChange={x => setTelephone(x.target.value)}
          fullWidth
        />
        <TextField 
          id='signup-form-email' 
          type='email'
          value={emailValue}
          label="Email"
          onChange={x => setEmailValue(x.target.value)}
          fullWidth
          error={!emailValid(emailValue)}
          helperText={!emailValid(emailValue) && "Please provide a valid email address."}
        />
        <TextField
          id='signup-form-password'
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={pwdValue}
          onChange={x => setPwdValue(x.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={x => x.preventDefault()}
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button 
          disabled={!emailValid(emailValue)}
          variant="contained"
          color="primary"
          onClick={() => tryRegister()}
          fullWidth
          sx={{ padding: '12px', marginTop: '16px' }}
        >
          Register
        </Button>
      </Stack>
    </Box>
  );
}
