"use client";
import { Avatar, Box, Button } from "@mui/material";

export default function ProfileAvatar({
  photo,
  isEditable,
}: {
  photo: string | null;
  isEditable: boolean;
}) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={photo ? `data:image/jpeg;base64,${photo}` : undefined}
        variant="rounded"
        sx={{ width: 150, height: 150, backgroundColor: "gray" }}
      />
      {isEditable && (
        <Button variant="contained" sx={{ marginTop: 2 }}>
          Upload Photo
        </Button>
      )}
    </Box>
  );
}
