'use client';

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
  const appBarHeight = 64; // Assuming AppBar height is 64px (adjust as needed)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={[
              { mr: 2 },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Welcome, {`${session?.user?.FirstName} ${session?.user?.LastName}`}
          </Typography>
          <AvatarButton />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
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

      {/* Main Content */}
      <DrawerContent open={open} drawerWidth={drawerWidth}>
        <DrawerHeader />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px', // Adjust padding here if needed
            minHeight: `calc(100vh - ${appBarHeight}px)`, // Adjust based on AppBar height
            overflow: 'auto', // Ensure content can scroll if necessary
          }}
        >
          {children}
        </Box>
      </DrawerContent>
    </Box>
  );
}
