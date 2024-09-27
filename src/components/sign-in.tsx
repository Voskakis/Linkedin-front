'use client';

import { emailValid } from "@/lib/validations";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, Input, InputAdornment, TextField, Stack, Typography } from "@mui/material";
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
        callbackUrl: '/main/feed'
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Stack spacing={4} sx={{ width: '100%', maxWidth: 400 }}>
      <Typography variant="h6" align="center">
        Enter your credentials
      </Typography>
      <FormControl required fullWidth>
        <TextField
          label="Email"
          id="signup-form-email"
          type="email"
          value={emailValue}
          onChange={x => setEmailValue(x.target.value)}
          error={!emailValid(emailValue)}
          helperText={!emailValid(emailValue) && "Please provide a valid email address."}
        />
      </FormControl>
      <FormControl required fullWidth>
        <Input
          id="signin-form-password"
          type={showPassword ? 'text' : 'password'}
          value={pwdValue}
          onChange={x => setPwdValue(x.target.value)}
          placeholder="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={x => x.preventDefault()}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        onClick={() => trySignIn()}
        disabled={!emailValid(emailValue) || pwdValue === ''}
        sx={{ padding: '10px 20px', fontSize: '16px', borderRadius: '8px' }}
      >
        Sign in
      </Button>
    </Stack>
  );
}
