'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function GenericError() {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We&apos;re sorry, but an unexpected error has occurred. 
        Please try refreshing the page or return to the homepage.
      </Typography>
      <Typography variant="body2" gutterBottom>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/')}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};
