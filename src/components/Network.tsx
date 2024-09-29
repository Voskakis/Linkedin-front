"use client";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Avatar,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  photograph: string;
  jobTitle: string;
  employmentAgency: string;
};

export default function NetworkPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchConnectedUsers = async () => {
        try {
          const { data } = await axios.get(
            `https://localhost:7164/api/users/GetConnections/${(jwtDecode(session.user.AccessToken) as any).id}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.AccessToken}`,
              },
            }
          );
          setUsers(data);
        } catch (error) {
          setError("Failed to load your connections.");
        } finally {
          setLoading(false);
        }
      };

      fetchConnectedUsers();
    } else {
      setLoading(false);
    }
  }, [session, status]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (status !== "authenticated") {
    return <p>Please log in to view your network connections.</p>;
  }

  if (users.length === 0) {
    return <p>No connections found.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <Grid container spacing={3}>
        {users.map((user: User) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <Link href={`main/users/${user.id}`} passHref>
                <CardActionArea>
                  <CardContent>
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      src={user.photograph}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Typography variant="h6">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.jobTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.employmentAgency}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
