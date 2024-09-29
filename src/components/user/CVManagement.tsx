"use client";
import { Box, Button, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function CVManagement({
  bioFileId,
  isEditable,
}: {
  bioFileId: string;
  isEditable: boolean;
}) {
  return (
    <Box padding={3} border={1} borderColor="grey.300" borderRadius={2}>
      <Typography variant="h5" gutterBottom>
        Your Professional Story
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Upload or download your CV to showcase your journey and achievements.
      </Typography>
      <Button variant="contained" startIcon={<DownloadIcon />}>
        Download CV
      </Button>
      {isEditable && (
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
      )}
    </Box>
  );
}
