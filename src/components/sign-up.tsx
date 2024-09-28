'use client'

import React, { useState } from "react";
import { emailValid } from "@/lib/validations";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField, Box, Typography, Stack, Alert } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [firstname, setFirstnameValue] = useState('');
  const [lastname, setLastnameValue] = useState('');
  const [telephone, setTelephone] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [pwdValue, setPwdValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function tryRegister() {
    setErrorMessage('');
    try {
      await axios.post('https://localhost:7164/api/Authenticate/Register', {
        email: emailValue,
        password: pwdValue,
        firstName: firstname,
        lastName: lastname,
        phoneNumber: telephone
      });
      router.push('/signin');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'An error occurred during registration. Please try again.');
      } else if (error instanceof Error) {
        setErrorMessage(error.message || 'An unknown error occurred.');
      } else {
        setErrorMessage('An unknown error occurred.');
      }
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
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}
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
