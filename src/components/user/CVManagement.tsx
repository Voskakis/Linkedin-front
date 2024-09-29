"use client";

import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";

export default function CVManagement({
  bioFileId,
  handleDownloadCV,
  handleUploadCV,
}: {
  bioFileId: string;
  handleDownloadCV: () => void;
  handleUploadCV: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Box padding={3} border={1} borderColor="grey.300" borderRadius={2}>
      <Typography variant="h5" gutterBottom>
        Your Professional Story
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Upload or download your CV to showcase your journey and achievements, as well as help recruitment processes.
      </Typography>
      <Button
        variant="contained"
        onClick={handleDownloadCV}
        startIcon={<DownloadIcon />}
        disabled={!bioFileId}
      >
        Download CV
      </Button>
      <input
        accept=".pdf"
        type="file"
        id="upload-cv"
        style={{ display: "none" }}
        onChange={handleUploadCV}
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
