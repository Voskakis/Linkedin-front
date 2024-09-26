'use client'

import { 
  List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import React from "react";
import {useRouter} from "next/router";

export default function SideBarNavigation({ sideList }: {
  sideList: {
    label: string;
    adminOnly: boolean;
    icon: JSX.Element;
    route: string;
  }[]
}) {
  const router = useRouter();
  return (
    <List>
      {sideList.map((value, index) => (
        <ListItem key={value.label} disablePadding>
          <ListItemButton onClick={() => router.push(value.route)}>
            <ListItemIcon>
              {value.icon}
            </ListItemIcon>
            <ListItemText primary={value.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}