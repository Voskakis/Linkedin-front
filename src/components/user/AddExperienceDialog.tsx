"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useSession } from "next-auth/react";
import authedAxios from "@/lib/axios";

interface EmploymentExperience {
  company: string;
  companyId?: number;
  position: string;
  positionId?: number;
  startDate: string;
  endDate?: string;
}

export default function AddExperienceDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (experience: EmploymentExperience) => void;
}) {
  const [company, setCompany] = useState("");
  const [companyId, setCompanyId] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState("");
  const [positionId, setPositionId] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [companies, setCompanies] = useState<
    { id: number; companyName: string }[]
  >([]);
  const [positions, setPositions] = useState<{ id: number; name: string }[]>(
    []
  );
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await authedAxios.get(`/api/companies`);
        const positionsData = await authedAxios.get(`/api/positions`);
        setCompanies(companiesData.data);
        setPositions(positionsData.data);
      } catch (error) {
        console.error("Error fetching companies or positions:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, session?.user?.AccessToken]);

  const handleSubmit = () => {
    const newExperience: EmploymentExperience = {
      company,
      companyId: companyId || undefined,
      position,
      positionId: positionId || undefined,
      startDate,
      endDate: endDate || undefined,
    };

    onSubmit(newExperience);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Employment Experience</DialogTitle>
      <DialogContent>
        <Autocomplete
          freeSolo={true}
          options={companies.map((option) => option.companyName)}
          onInputChange={(event, newInputValue) => setCompany(newInputValue)}
          onChange={(event, newValue: any) => {
            const selectedCompany = companies.find(
              (c) => c.companyName === newValue
            );
            setCompanyId(selectedCompany?.id);
            setCompany(selectedCompany?.companyName || newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Company Name" margin="normal" />
          )}
        />
        <Autocomplete
          freeSolo={true}
          options={positions.map((option) => option.name)}
          onInputChange={(event, newInputValue) => setPosition(newInputValue)}
          onChange={(event, newValue: any) => {
            const selectedPosition = positions.find((p) => p.name === newValue);
            setPositionId(selectedPosition?.id);
            setPosition(selectedPosition?.name || newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Position Title" margin="normal" />
          )}
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Experience
        </Button>
      </DialogActions>
    </Dialog>
  );
}
