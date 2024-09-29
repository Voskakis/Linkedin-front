"use client";

import { Avatar, Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ProfileAvatar({
  photo,
  userId,
}: {
  photo: string | null;
  userId: string;
}) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [pic, setPic ] = useState(photo);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={pic ? `data:image/jpeg;base64,${pic}` : undefined}
        variant="rounded"
        sx={{ width: 150, height: 150, backgroundColor: "gray" }}
      />
      <input
        accept="image/*"
        type="file"
        id="upload-photo"
        style={{ display: "none" }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const formData = new FormData();
          formData.append("file", file);
          try {
            setLoading(true);
            const response = await axios.post(
              `https://localhost:7164/api/users/${userId}/uploadPhoto`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${session?.user?.AccessToken}`,
                },
              }
            );
            if (response.status === 200) {
              setPic(response.data);
              console.log(response.data);
            }
          } catch (error) {
            console.error("Error uploading photo:", error);
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
      />
      <label htmlFor="upload-photo">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? "Uploading..." : pic ? "Change Photo" : "Upload Photo"}
        </Button>
      </label>
    </Box>
  );
}
