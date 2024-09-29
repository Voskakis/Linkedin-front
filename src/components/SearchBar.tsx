"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";

interface SearchResult {
  id: string;
  fullName: string;
  email: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (query.length > 0) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(
            `https://localhost:7164/api/users/${(jwtDecode(session?.user.AccessToken as string) as any).id}/SearchUsersByName/${query}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.AccessToken}`,
              },
            }
          );
          setResults(response.data);
          setOpen(true);
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      };

      fetchResults();
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query, session?.user.AccessToken]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          style: {
            backgroundColor: "white",
            color: "black",
          },
        }}
        InputLabelProps={{
          style: {
            color: "black",
          },
        }}
      />
      {open && results.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            width: "100%",
            zIndex: 10,
            backgroundColor: "white",
            color: "black",
          }}
        >
          <List>
            {results.map((result) => (
              <ListItemButton
                key={result.id}
                onClick={() => {
                  router.push(`/main/nonadminusers/${result.id}`);
                  setQuery("");
                  setOpen(false);
                }}
                style={{
                  color: "black",
                }}
              >
                <ListItemText
                  primary={result.fullName}
                  secondary={result.email}
                  primaryTypographyProps={{ style: { color: "black" } }}
                  secondaryTypographyProps={{ style: { color: "black" } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}
