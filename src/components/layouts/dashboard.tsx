'use client'

import { 
  Box, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography, useTheme 
} from "@mui/material";
import React from "react";
import AppBar from "../extensions/AppBar";
import DrawerHeader from "../extensions/DrawerHeader";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ManageAccounts as ManageAccountsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import DrawerContent from "../extensions/DrawerContent";
import { useSession } from "next-auth/react";
import Chat from "../chat/Chat";
import SideBarNavigation from "../SideBarNavigation";

export default function PersistentDrawerLeft({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();

  const drawerWidth = 240;

  //TODO: add all the possible routes that can be navigated from the side bar and their respective pages
  const sideList: {
    label: string;
    adminOnly: boolean;
    icon: JSX.Element;
    route: string;
  }[] = [
    {
      label: 'Users',
      adminOnly: true,
      icon: <ManageAccountsIcon />,
      route: '/users'
    },
  ]

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
          <Typography variant="h6" noWrap component="div">
            <p>Welcome, {`${session?.user.FirstName} ${session?.user.LastName}`}</p>
          </Typography>
          <SettingsIcon />
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
        <Divider />
        <SideBarNavigation sideList={sideList} />
      </Drawer>
      <DrawerContent open={open} drawerWidth={drawerWidth}>
        <DrawerHeader />
        <main>{children}</main>
      </DrawerContent>
      <Chat />
    </Box>
  );
}