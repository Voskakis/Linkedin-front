'use client'

import { styled } from "@mui/material";

interface DrawerContentProps {
    open?: boolean;
    drawerWidth: number;
  }

const DrawerContent = styled('main', { 
    shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth' 
})<DrawerContentProps>(({ theme, drawerWidth }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }));

  export default DrawerContent;