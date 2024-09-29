"use client";
import { Box, Grid, TextField, Typography } from "@mui/material";

export default function ProfileDetails({
  firstName,
  lastName,
  phoneNumber,
  email,
  isEditable,
  setFirstName,
  setLastName,
  setPhoneNumber,
}: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  isEditable: boolean;
  setFirstName?: (value: string) => void;
  setLastName?: (value: string) => void;
  setPhoneNumber?: (value: string) => void;
}) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {email}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName?.(e.target.value)}
            fullWidth
            disabled={!isEditable}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName?.(e.target.value)}
            fullWidth
            disabled={!isEditable}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber?.(e.target.value)}
            fullWidth
            disabled={!isEditable}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
