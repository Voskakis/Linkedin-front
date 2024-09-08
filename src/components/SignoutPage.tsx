'use client';
import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const SignoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    //TODO: clear tokens and storages
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        You have successfully signed out.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for using our site. We hope to see you again soon!
      </Typography>
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push('/')}
        >
            Go to Homepage
        </Button>
    </Box>
  );
};

export default SignoutPage;
