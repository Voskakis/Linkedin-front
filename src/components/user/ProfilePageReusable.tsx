"use client";

import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import ProfileDetails from "./ProfileDetails";
import ProfileAvatar from "./ProfileAvatar";
import CVManagement from "./CVManagement";
import EmploymentExperienceList from "./EmploymentExperienceList";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

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
  position: string;
  startDate: string;
  endDate?: string;
}

interface VisibilitySettings {
  phoneNumberIsPublic: boolean;
  bioIsPublic: boolean;
  photoIsPublic: boolean;
  employmentExperienceIsPublic: boolean;
  userId?: number | string;
}

export default function ProfilePage({ isEditable }: { isEditable: boolean }) {
  const { data: session } = useSession();
  const { id: urlParamsId } = useParams();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [employmentExperiences, setEmploymentExperiences] = useState<
    EmploymentExperience[]
  >([]);
  const [visibility, setVisibility] = useState<VisibilitySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.AccessToken) {
        const userId = (jwtDecode(session.user.AccessToken) as any).id;

        try {
          setLoading(true);

          const userResponse = isEditable
            ? await axios.get<UserProfile>(
                `https://localhost:7164/api/users/${userId}/GetPersonalInfo`,
                {
                  headers: {
                    Authorization: `Bearer ${session.user.AccessToken}`,
                  },
                }
              )
            : await axios.get<UserProfile>(
                `https://localhost:7164/api/users/${userId}/GetUserPublicInfo/${urlParamsId}`
              );

          setUser(userResponse.data);

          const experienceResponse = isEditable
            ? await axios.get<EmploymentExperience[]>(
                `https://localhost:7164/api/users/${userId}/GetUserEmploymentExperieces`,
                {
                  headers: {
                    Authorization: `Bearer ${session.user.AccessToken}`,
                  },
                }
              )
            : await axios.get<EmploymentExperience[]>(
                `https://localhost:7164/api/users/${userId}/GetPublicEmploymentExperiences/${urlParamsId}`
              );

          setEmploymentExperiences(experienceResponse.data);

          const visibilityResponse = await axios.get<VisibilitySettings>(
            `https://localhost:7164/api/users/${userId}/GetWhichArePublicInfo`,
            {
              headers: {
                Authorization: `Bearer ${session.user.AccessToken}`,
              },
            }
          );
          setVisibility(visibilityResponse.data);
        } catch (error) {
          console.error(
            "Error fetching user data or employment experiences",
            error
          );
          setError("Failed to load data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [session, urlParamsId, isEditable]);

  const handleToggleChange = async (
    key: keyof VisibilitySettings,
    value: boolean
  ) => {
    if (visibility) {
      const updatedVisibility = { ...visibility, [key]: value };
      updatedVisibility.userId = (
        jwtDecode(session?.user.AccessToken as string) as any
      ).id;
      try {
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !user) {
    return <Typography color="error">{error || "User not found"}</Typography>;
  }

  return (
    <Box padding={3}>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={4}
          container
          direction="column"
          alignItems="center"
        >
          <ProfileAvatar photo={user.photo} isEditable={isEditable} />
          {isEditable && visibility && (
            <FormControlLabel
              control={
                <Switch
                  checked={visibility.photoIsPublic}
                  onChange={(e) =>
                    handleToggleChange("photoIsPublic", e.target.checked)
                  }
                />
              }
              label="Photo Public"
            />
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileDetails
            firstName={user.firstName}
            lastName={user.lastName}
            phoneNumber={user.phoneNumber}
            email={user.email}
            isEditable={isEditable}
            setFirstName={isEditable ? (value) => {} : undefined}
            setLastName={isEditable ? (value) => {} : undefined}
            setPhoneNumber={isEditable ? (value) => {} : undefined}
          />
          {isEditable && visibility && (
            <FormControlLabel
              control={
                <Switch
                  checked={visibility.phoneNumberIsPublic}
                  onChange={(e) =>
                    handleToggleChange("phoneNumberIsPublic", e.target.checked)
                  }
                />
              }
              label="Phone Number Public"
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <CVManagement bioFileId={user.bioFileId} isEditable={isEditable} />
          {isEditable && visibility && (
            <FormControlLabel
              control={
                <Switch
                  checked={visibility.bioIsPublic}
                  onChange={(e) =>
                    handleToggleChange("bioIsPublic", e.target.checked)
                  }
                />
              }
              label="CV Public"
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <EmploymentExperienceList
            experiences={employmentExperiences}
            isEditable={isEditable}
          />
          {isEditable && visibility && (
            <FormControlLabel
              control={
                <Switch
                  checked={visibility.employmentExperienceIsPublic}
                  onChange={(e) =>
                    handleToggleChange(
                      "employmentExperienceIsPublic",
                      e.target.checked
                    )
                  }
                />
              }
              label="Experience Public"
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
