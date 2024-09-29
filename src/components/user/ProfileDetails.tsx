"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileDetails({
  firstName,
  lastName,
  phoneNumber,
  email,
  handleSave,
  setFirstName,
  setLastName,
  setPhoneNumber,
}: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  handleSave: () => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setPhoneNumber: (value: string) => void;
}) {
  const [editMode, setEditMode] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [initialFirstName, setInitialFirstName] = useState(firstName);
  const [initialLastName, setInitialLastName] = useState(lastName);
  const [initialPhoneNumber, setInitialPhoneNumber] = useState(phoneNumber);

  useEffect(() => {
    if (
      firstName !== initialFirstName ||
      lastName !== initialLastName ||
      phoneNumber !== initialPhoneNumber
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [
    firstName,
    lastName,
    phoneNumber,
    initialFirstName,
    initialLastName,
    initialPhoneNumber,
  ]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: 3 }}
      >
        <Typography variant="h5">{email}</Typography>
        <IconButton onClick={() => setEditMode((prev) => !prev)}>
          <EditIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            disabled={!editMode}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            disabled={!editMode}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            disabled={!editMode}
          />
        </Grid>
      </Grid>
      {editMode && isChanged && (
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      )}
    </Box>
  );
}
