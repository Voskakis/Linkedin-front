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
      sx={{
        maxWidth: 600,
        padding: '24px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
        borderRadius: '12px',
        backgroundColor: 'white',
        margin: 'auto',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We&apos;re sorry, but an unexpected error has occurred. 
        Please try refreshing the page or return to the homepage.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ marginTop: '16px' }}
        onClick={() => router.push('/')}
      >
        Go to Homepage
      </Button>
    </Box>
  );
}
