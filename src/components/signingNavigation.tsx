'use client';
import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SigningNav() {
  const router = useRouter();

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#1a73e8',
          },
        }}
        onClick={() => router.push('/signin')}
      >
        Sign In
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '8px',
          boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#d32f2f',
          },
        }}
        onClick={() => router.push('/signup')}
      >
        Sign Up
      </Button>
    </Stack>
  );
}
