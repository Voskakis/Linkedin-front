'use client'

import {
  Typography,
  CardContent,
  IconButton,
  Switch,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const UserDetails = ({
  user,
  isOwnProfile,
  onToggleField,
}: {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isPublicEmail: boolean;
    isPublicPhone: boolean;
  };
  isOwnProfile: boolean;
  onToggleField: (field: string) => void;
}) => (
  <CardContent>
    <Typography gutterBottom variant="h4" component="div">
      {user.firstName} {user.lastName}
    </Typography>

    <Box display="flex" alignItems="center" mb={2}>
      <Typography variant="body1">
        <strong>Email:</strong> {user.email}
      </Typography>
      {isOwnProfile && (
        <>
          <Switch
            checked={user.isPublicEmail}
            onChange={() => onToggleField("isPublicEmail")}
          />
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </>
      )}
    </Box>

    <Box display="flex" alignItems="center" mb={2}>
      <Typography variant="body1">
        <strong>Phone Number:</strong> {user.phoneNumber}
      </Typography>
      {isOwnProfile && (
        <>
          <Switch
            checked={user.isPublicPhone}
            onChange={() => onToggleField("isPublicPhone")}
          />
          <IconButton size="small">
            <EditIcon />
          </IconButton>
        </>
      )}
    </Box>
  </CardContent>
);
