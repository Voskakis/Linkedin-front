"use client";
import { Box, Grid, Typography, Button } from "@mui/material";

export default function EmploymentExperienceList({
  experiences,
  isEditable,
}: {
  experiences: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
  }[];
  isEditable: boolean;
}) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employment Experiences
      </Typography>
      {experiences.length > 0 ? (
        experiences.map((experience, index) => (
          <Grid
            container
            spacing={1}
            key={index}
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Grid item xs={4}>
              <Typography variant="body2" fontWeight="bold">
                {experience.company}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">{experience.position}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="text.secondary">
                {experience.startDate} - {experience.endDate || "Present"}
              </Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography variant="body2">No employment experience found.</Typography>
      )}
      {isEditable && (
        <Button variant="contained" color="primary">
          Add Experience
        </Button>
      )}
    </Box>
  );
}
