'use client'

import { 
  Box, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography, useTheme 
} from "@mui/material";
import React from "react";
import AppBar from "@/components/extensions/AppBar";
import DrawerHeader from "@/components/extensions/DrawerHeader";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import DrawerContent from "@/components/extensions/DrawerContent";
import { useSession } from "next-auth/react";
import SideBarNavigation from "@/components/SideBarNavigation";
import { sideList, adminSideList } from "./SideList";
import AvatarButton from "@/components/AvatarButton";

export default function PersistentDrawerLeft({ children }: Readonly<{ children: React.ReactNode; }>) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();

  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <p>Welcome, {`${session?.user?.FirstName} ${session?.user?.LastName}`}</p>
          </Typography>
          <AvatarButton />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <SideBarNavigation sideList={adminSideList} />
        <Divider />
        <SideBarNavigation sideList={sideList} />
      </Drawer>
      <DrawerContent open={open} drawerWidth={drawerWidth}>
        <DrawerHeader />
        <main>{children}</main>
      </DrawerContent>
      {/* TODO: comment out this to have chat */}
      {/* <Chat /> */}
    </Box>
  );
}
