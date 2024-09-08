'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SigningNav() {
  const router = useRouter();
  return (
    <>
      <Button 
        variant="contained"
        onClick={()=> router.push('/signin')}
      >Sign IN</Button>
      <Button 
        variant="contained"
        onClick={()=> router.push('/signup')}
      >Sign Up</Button>
    </>
  );
}