'use client'

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
  FormGroup,
  RadioGroup,
  Radio,
  Button,
  Typography,
  Grid,
  Box
} from '@mui/material';

interface ExportDialogProps {
  open: boolean;
  onClose: () => void;
  onExport: (exportType: string, selectedCategories: SelectedCategories) => void;
}

interface SelectedCategories {
  cv: boolean;
  uploads: boolean;
  workExperience: boolean;
  interests: boolean;
  comments: boolean;
  personalNetwork: boolean;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ open, onClose, onExport }) => {
  const [exportType, setExportType] = useState('csv');
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategories>({
    cv: false,
    uploads: false,
    workExperience: false,
    interests: false,
    comments: false,
    personalNetwork: false,
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedCategories({
      ...selectedCategories,
      [event.target.name]: event.target.checked,
    });

  const handleExport = () => {
    onExport(exportType, selectedCategories);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Main Dialog Title */}
      <DialogTitle>
        <Typography variant="h5" component="div" fontWeight="bold">
          Export Users Data
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Choose File Type
              </Typography>
              <RadioGroup
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
              >
                <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                <FormControlLabel value="xml" control={<Radio />} label="XML" />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Select Data to Include
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.cv}
                      onChange={handleCategoryChange}
                      name="cv"
                    />
                  }
                  label="CV"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.uploads}
                      onChange={handleCategoryChange}
                      name="uploads"
                    />
                  }
                  label="Uploads"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.workExperience}
                      onChange={handleCategoryChange}
                      name="workExperience"
                    />
                  }
                  label="Work Experience"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.interests}
                      onChange={handleCategoryChange}
                      name="interests"
                    />
                  }
                  label="Interests"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.comments}
                      onChange={handleCategoryChange}
                      name="comments"
                    />
                  }
                  label="Comments"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCategories.personalNetwork}
                      onChange={handleCategoryChange}
                      name="personalNetwork"
                    />
                  }
                  label="Personal Network"
                />
              </FormGroup>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleExport} color="primary">
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportDialog;
