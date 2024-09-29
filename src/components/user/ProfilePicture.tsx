"use client";

import { Box, Paper } from "@mui/material";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";

interface ProfilePictureProps {}

export const ProfilePicture = ({
  photoUrl,
  alt,
}: {
  photoUrl: string | null;
  alt: string;
}) => (
  <Paper elevation={3}>
    {photoUrl ? (
      <Box
        sx={{
          width: "100%",
          height: 0,
          paddingBottom: "100%",
          position: "relative",
        }}
      >
        <Image src={photoUrl} alt={alt} layout="fill" objectFit="cover" />
      </Box>
    ) : (
      <Box
        sx={{
          width: "100%",
          paddingBottom: "100%",
          backgroundColor: "#e0e0e0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <PersonIcon sx={{ fontSize: 100, color: "#9e9e9e" }} />
      </Box>
    )}
  </Paper>
);
