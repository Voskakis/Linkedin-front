"use client";

import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

export default function CVManagement({ bioFileId }: { bioFileId: string }) {
  const [id, setId] = useState(bioFileId);
  const { data: session } = useSession();
  return (
    <Box padding={3} border={1} borderColor="grey.300" borderRadius={2}>
      <Typography variant="h5" gutterBottom>
        Your Professional Story
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Upload or download your CV to showcase your journey and achievements, as
        well as help recruitment processes.
      </Typography>
      <Button
        variant="contained"
        onClick={async () => {
          try {
            const response = await axios.get(
              `https://localhost:7164/api/users/downloadbio/${bioFileId}`,
              {
                headers: {
                  Authorization: `Bearer ${session?.user?.AccessToken}`,
                },
                responseType: "arraybuffer",
              }
            );
            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "cv.pdf";
            link.click();
          } catch (error) {
            console.error("Error downloading CV:", error);
          }
        }}
        startIcon={<DownloadIcon />}
        disabled={!id}
      >
        Download CV
      </Button>
      <input
        accept=".pdf"
        type="file"
        id="upload-cv"
        style={{ display: "none" }}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files?.[0]) {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            try {
              const { data, status } = await axios.post(
                `https://localhost:7164/api/users/${(jwtDecode(session?.user.AccessToken as string) as any).id}/UploadBio`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${session?.user?.AccessToken}`,
                  },
                }
              );
              if (status === 200) {
              alert("CV uploaded successfully!");
              setId(data);
              }
            } catch (error) {
              console.error("Error uploading CV:", error);
            }
          }
        }}
      />
      <label htmlFor="upload-cv">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{ marginLeft: 2 }}
        >
          Upload New CV
        </Button>
      </label>
    </Box>
  );
}
