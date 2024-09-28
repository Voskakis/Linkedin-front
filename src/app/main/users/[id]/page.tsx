'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  CircularProgress, 
  Box, 
  Grid, 
  Paper 
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // For placeholder icon

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photographBlob?: Blob; // Optional blob for photograph
  cvBlob?: Blob; // Optional blob for CV file
}

export default function UserPage() {
  const { id: userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching user data with mock blobs
    const mockUserData: User = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      photographBlob: undefined, // Simulating missing image blob
      cvBlob: new Blob([], { type: 'application/pdf' }) // Mock CV blob
    };

    // Simulate an API call to get the user data
    setTimeout(() => {
      if (userId) {
        setUser(mockUserData); // Mock data as if fetched from the API

        // Convert blobs to URLs
        if (mockUserData.photographBlob) {
          const photoUrl = URL.createObjectURL(mockUserData.photographBlob);
          setPhotoUrl(photoUrl);
        }

        if (mockUserData.cvBlob) {
          const cvUrl = URL.createObjectURL(mockUserData.cvBlob);
          setCvUrl(cvUrl);
        }

        setLoading(false);
      } else {
        setError('User ID not provided');
        setLoading(false);
      }
    }, 1000); // Simulating request delay of 1 second

    // Cleanup object URLs on unmount
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      if (cvUrl) URL.revokeObjectURL(cvUrl);
    };
  }, [userId, photoUrl, cvUrl]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">
          No user data found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={4}>
        {/* User Photo Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            {photoUrl ? (
              <Box sx={{ width: '100%', height: 0, paddingBottom: '100%', position: 'relative' }}>
                <Image 
                  src={photoUrl} 
                  alt={`${user.firstName} ${user.lastName}`} 
                  layout="fill" 
                  objectFit="cover" 
                />
              </Box>
            ) : (
              <Box 
                sx={{ 
                  width: '100%', 
                  paddingBottom: '100%', 
                  backgroundColor: '#e0e0e0', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <PersonIcon sx={{ fontSize: 100, color: '#9e9e9e' }} />
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* User Details Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Phone Number:</strong> {user.phoneNumber}
              </Typography>
            </CardContent>
          </Paper>
        </Grid>

        {/* CV Download Section */}
        <Grid item xs={12} md={12} display="flex" justifyContent="center">
          {cvUrl ? (
            <Button 
              variant="contained" 
              color="primary" 
              href={cvUrl} 
              download={`${user.firstName}-${user.lastName}-CV.pdf`} 
              sx={{ mt: 2 }}
            >
              Download CV
            </Button>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              CV not available
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
