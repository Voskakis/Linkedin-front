"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import DownloadCVButton from "../DownloadCV";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo?: Blob;
}

export default function UserPage({ userId }: { userId: number }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    const fetchUser = async () => {
      try {
        if (!session) {
          setError("You must be logged in to view this page.");
          return;
        }
        setLoading(true);
        const { data } = await axios.get<User>(
          `https://localhost:7164/api/users/GetInfo/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.AccessToken}`,
            },
          }
        );

        setUser(data);

        if (data.photo) {
          const photoUrl = URL.createObjectURL(data.photo);
          setPhotoUrl(photoUrl);
        }
      } catch (err) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setError("User ID not provided");
      setLoading(false);
    }

    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [session, userId, photoUrl, status]);

  if (status === "loading" || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h6">No user data found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            {photoUrl ? (
              <Box
                sx={{
                  width: "100%",
                  paddingBottom: "100%",
                  position: "relative",
                }}
              >
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
                  width: "100%",
                  paddingBottom: "100%",
                  backgroundColor: "#e0e0e0",
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <PersonIcon sx={{ fontSize: 100, color: "#9e9e9e" }} />
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
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
        <Grid item xs={12} md={12} display="flex" justifyContent="center">
          <DownloadCVButton
            userId={user.id}
            userName={`${user.firstName}-${user.lastName}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
