"use client";
import {
  Box,
  Button,
  CircularProgress as CircularProgressIcon,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CVManagement({
  bioFileId,
  isEditable,
}: {
  bioFileId: string;
  isEditable: boolean;
}) {
  const [cvId, setCvId] = useState(bioFileId);
  const [isUpLoading, setIsUpLoading] = useState<boolean>(false);
  const [isDownLoading, setIsDownLoading] = useState<boolean>(false);
  const { data: session } = useSession();
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
            startIcon={
              isUpLoading ? <CircularProgressIcon /> : <CloudUploadIcon />
            }
            sx={{ marginLeft: 2 }}
            onClick={async () => {
              setIsUpLoading(true);
              try {
                try {

                }
                catch (error) {
                  console.log(error);
                }
                finally{
                  setIsUpLoading(false);
                }
              }
            }}
          >
            Upload New CV
          </Button>
        </label>
      )}
    </Box>
  );
}
