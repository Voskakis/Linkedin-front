"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";

const DownloadCVButton = ({ userId, userName }: {
	userId: number;
  userName: string;
}) => {
  const { data: session } = useSession();
  const [cvLoading, setCvLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      {cvLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            setCvLoading(true);
            try {
              const response = await axios.get(
                `https://localhost:7164/api/users/GetCV/${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${session?.user?.AccessToken}`,
                  },
                  responseType: "blob",
                }
              );
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", `${userName}-CV.pdf`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } catch (err) {
              setError("Failed to download CV");
            } finally {
              setCvLoading(false);
            }
          }}
        >
          Download CV
        </Button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default DownloadCVButton;
