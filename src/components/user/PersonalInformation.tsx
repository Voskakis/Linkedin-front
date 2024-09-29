"use client";

import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import CVManagement from "./CVManagement";
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

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bioFileId, setBioFileId] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
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
        data.id = id;
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

    fetchUser();
  }, [session?.user.AccessToken]);

  const handleSave = async () => {
    try {
      await axios.put("/api/user", { firstName, lastName, phoneNumber });
      alert("Profile updated!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDownloadCV = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7164/api/users/${(jwtDecode(session?.user.AccessToken as string) as any).id}/${bioFileId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.user?.AccessToken}`,
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "cv.pdf";
      link.click();
    } catch (error) {
      console.error("Error downloading CV:", error);
    }
  };

  const handleUploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      try {
        await axios.post(
          `https://localhost:7164/api/users/${(jwtDecode(session?.user.AccessToken as string) as any).id}/UploadBio`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${session?.user?.AccessToken}`,
            },
          }
        );
        alert("CV uploaded successfully!");
      } catch (error) {
        console.error("Error uploading CV:", error);
      }
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
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
          <ProfileAvatar photo={photo} userId={user.id} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileDetails
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            email={user.email}
            handleSave={handleSave}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setPhoneNumber={setPhoneNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <CVManagement
            bioFileId={bioFileId}
            handleDownloadCV={handleDownloadCV}
            handleUploadCV={handleUploadCV}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
