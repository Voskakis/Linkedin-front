"use client";

import { useState, useEffect } from "react";
import { Box, Grid, Typography, Button, Switch, FormControlLabel } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import CVManagement from "./CVManagement";
import EmploymentExperienceList from "./EmploymentExperienceList";
import AddExperienceDialog from "./AddExperienceDialog";
import { jwtDecode } from "jwt-decode";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bioFileId: string;
  photo: string | null;
}

interface EmploymentExperience {
  company: string;
  companyId?: number;
  position: string;
  positionId?: number;
  startDate: string;
  endDate?: string;
}

interface VisibilitySettings {
  userId: string;
  phoneNumberIsPublic: boolean;
  bioIsPublic: boolean;
  photoIsPublic: boolean;
  employmentExperienceIsPublic: boolean;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bioFileId, setBioFileId] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [employmentExperiences, setEmploymentExperiences] = useState<EmploymentExperience[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibility, setVisibility] = useState<VisibilitySettings | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = (jwtDecode(session?.user.AccessToken as string) as any).id;
        const { data } = await axios.get<UserProfile>(
          `https://localhost:7164/api/users/${id}/GetPersonalInfo`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.AccessToken}`,
            },
          }
        );
        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.phoneNumber);
        setBioFileId(data.bioFileId);
        setPhoto(data.photo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchEmploymentExperiences = async () => {
      try {
        const id = (jwtDecode(session?.user.AccessToken as string) as any).id;
        const { data } = await axios.get<EmploymentExperience[]>(
          `https://localhost:7164/api/users/${id}/GetUserEmploymentExperiences`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.AccessToken}`,
            },
          }
        );
        setEmploymentExperiences(data);
      } catch (error) {
        console.error("Error fetching employment experiences:", error);
      }
    };

    const fetchVisibilitySettings = async () => {
      try {
        const id = (jwtDecode(session?.user.AccessToken as string) as any).id;
        const { data } = await axios.get<VisibilitySettings>(
          `https://localhost:7164/api/users/${id}/GetWhichArePublicInfo`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.AccessToken}`,
            },
          }
        );
        setVisibility(data ?? {
          bioIsPublic: false,
          employmentExperienceIsPublic: false,
          phoneNumberIsPublic: false,
          photoIsPublic: false,
        });
      } catch (error) {
        console.error("Error fetching visibility settings:", error);
      }
    };

    fetchUser();
    fetchEmploymentExperiences();
    fetchVisibilitySettings();
  }, [session?.user.AccessToken]);

  const handleToggleChange = async (key: keyof VisibilitySettings, value: boolean) => {
    if (visibility) {
      const updatedVisibility = { ...visibility, [key]: value };
      try {
        const { userId } = visibility;
        await axios.post(
          `https://localhost:7164/api/users/SetPublicInfo`,
          updatedVisibility,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.AccessToken}`,
            },
          }
        );
        setVisibility(updatedVisibility);
      } catch (error) {
        console.error("Error updating visibility settings:", error);
      }
    }
  };

  if (!user || !visibility) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box padding={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} container direction="column" alignItems="center">
          <ProfileAvatar photo={photo} userId={user.id} />
          <FormControlLabel
            control={
              <Switch
                checked={visibility.photoIsPublic}
                onChange={(e) => handleToggleChange("photoIsPublic", e.target.checked)}
              />
            }
            label="Photo Public"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileDetails
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            email={user.email}
            handleSave={async () => {
              try {
                await axios.put("/api/user", { firstName, lastName, phoneNumber });
                alert("Profile updated!");
              } catch (error) {
                console.error("Error updating profile:", error);
              }
            }}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhoneNumber={setPhoneNumber}
          />
          <FormControlLabel
            control={
              <Switch
                checked={visibility.phoneNumberIsPublic}
                onChange={(e) => handleToggleChange("phoneNumberIsPublic", e.target.checked)}
              />
            }
            label="Phone Number Public"
          />
        </Grid>
        <Grid item xs={12}>
          <CVManagement bioFileId={bioFileId} />
          <FormControlLabel
            control={
              <Switch
                checked={visibility.bioIsPublic}
                onChange={(e) => handleToggleChange("bioIsPublic", e.target.checked)}
              />
            }
            label="CV Public"
          />
        </Grid>
        <Grid item xs={12}>
          <EmploymentExperienceList experiences={employmentExperiences} />
          <FormControlLabel
            control={
              <Switch
                checked={visibility.employmentExperienceIsPublic}
                onChange={(e) => handleToggleChange("employmentExperienceIsPublic", e.target.checked)}
              />
            }
            label="Experience Public"
          />
          <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>
            Add Experience
          </Button>
        </Grid>
      </Grid>
      <AddExperienceDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={async (newExperience: EmploymentExperience) => {
          const id = (jwtDecode(session?.user.AccessToken as string) as any).id;
          try {
            await axios.post(
              `https://localhost:7164/api/users/${id}/AddEmploymentExperience`,
              newExperience,
              {
                headers: {
                  Authorization: `Bearer ${session?.user?.AccessToken}`,
                },
              }
            );
            setEmploymentExperiences((prev) => [...prev, newExperience]);
          } catch (error) {
            console.error("Error adding employment experience:", error);
          }
        }}
      />
    </Box>
  );
}
