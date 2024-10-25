"use client";

import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import authedAxios from "@/lib/axios";
import { useSession } from "next-auth/react";

const SettingsForm = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (type: "email" | "password") => {
    setLoading(true);
    try {
      const endpoint = type === "email" ? "changeemail" : "changepassword";

      await authedAxios.put(
        "https://localhost:7164/api/authenticate/" + endpoint,
        {
          Email: type === "email" ? email : session?.user.email,
          Password: type === "password" ? password : null,
        }
      );
      setMessage(
        `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully.`
      );
    } catch (error) {
      setMessage(`Error updating ${type}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
      width="100%"
      maxWidth="400px"
      padding={3}
      boxShadow={3}
      borderRadius={2}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Account Settings
      </Typography>
      <Typography variant="body1" color="textSecondary" textAlign="center">
        Manage your account information here. You can update your email and
        password.
      </Typography>
      <TextField
        label="New Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleUpdate("email")}
        disabled={loading || !email}
        fullWidth
      >
        Update Email
      </Button>
      <TextField
        label="New Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleUpdate("password")}
        disabled={loading || !password}
        fullWidth
      >
        Update Password
      </Button>
      {message && (
        <Typography variant="body2" color="textSecondary" textAlign="center">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default SettingsForm;
