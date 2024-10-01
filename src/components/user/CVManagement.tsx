"use client";
import { Box, Button, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { useSession } from "next-auth/react";
import authedAxios from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import CircularProgress from "@mui/material/CircularProgress";

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
        Professional Story
      </Typography>
      {isEditable && (
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Upload or download your CV to showcase your journey and achievements.
        </Typography>
      )}
      <Button
        variant="contained"
        startIcon={
          isDownLoading ? (
            <Box
              sx={{
                width: 24,
                height: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={20} />
            </Box>
          ) : (
            <DownloadIcon />
          )
        }
        onClick={async () => {
          if (!cvId) return;
          setIsDownLoading(true);
          try {
            const response = await authedAxios.get(
              `/api/users/DownloadBio/${cvId}`,
              {
                responseType: "blob",
              }
            );
            const blob = new Blob([response.data], {
              type: response.data.type,
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "cv.pdf";
            link.click();
          } catch (error) {
            console.error("Error downloading CV:", error);
          } finally {
            setIsDownLoading(false);
          }
        }}
        disabled={!cvId}
      >
        {isDownLoading ? "Downloading..." : "Download CV"}
      </Button>
      {isEditable && (
        <>
          <input
            accept=".pdf"
            type="file"
            id="upload-cv"
            style={{ display: "none" }}
            onChange={async (e) => {
              if (e.target.files?.[0]) {
                const formData = new FormData();
                formData.append("file", e.target.files[0]);
                setIsUpLoading(true);
                try {
                  const { data, status } = await authedAxios.post(
                    `/api/users/${(jwtDecode(session?.user.AccessToken as string) as any).id}/UploadBio`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    }
                  );
                  if (status === 200) {
                    alert("CV uploaded successfully!");
                    setCvId(data);
                  }
                } catch (error) {
                  console.error("Error uploading CV:", error);
                } finally {
                  setIsUpLoading(false);
                }
              }
            }}
          />
          <label htmlFor="upload-cv">
            <Button
              variant="contained"
              component="span"
              startIcon={
                isUpLoading ? (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size={20} />
                  </Box>
                ) : (
                  <CloudUploadIcon />
                )
              }
              sx={{ marginLeft: 2 }}
            >
              {isUpLoading ? "Uploading..." : "Upload New CV"}
            </Button>
          </label>
        </>
      )}
    </Box>
  );
}
