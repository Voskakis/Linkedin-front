"use client";

import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import authedAxios from "@/lib/axios";

const DownloadCVButton = ({
  userId,
  userName,
}: {
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
              const response = await authedAxios.get(
                `/api/users/GetCV/${userId}`,
                {
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
