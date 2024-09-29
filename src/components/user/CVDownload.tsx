"use client";

import { Button, Typography } from "@mui/material";

export const CVDownload = ({
  cvUrl,
  user,
}: {
  cvUrl: string | null;
  user: { firstName: string; lastName: string };
}) => (
  <>
    {cvUrl ? (
      <Button
        variant="contained"
        color="primary"
        href={cvUrl}
        download={`${user.firstName}-${user.lastName}-CV.pdf`}
        sx={{ mt: 2 }}
      >
        Download CV
      </Button>
    ) : (
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        CV not available
      </Typography>
    )}
  </>
);
