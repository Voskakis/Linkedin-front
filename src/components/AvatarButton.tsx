'use client'

import { Avatar, IconButton, Menu, MenuItem, Grow } from "@mui/material";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Person as PersonIcon } from '@mui/icons-material';
import { useRouter } from "next/navigation";

export default function UserMenu({ onSignOut }: {
  onSignOut?: () => void;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          backgroundColor: openMenu ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
          borderRadius: openMenu ? '8px' : '50%',
          padding: openMenu ? '8px 16px' : '8px',
          transition: 'all 0.3s ease',
        }}
      >
        <Avatar alt={session?.user?.FirstName} src={session?.user?.image || undefined}>
          <PersonIcon />
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Grow}
        TransitionProps={{ timeout: 500 }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              border: '1px solid',
              borderColor: openMenu ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              transition: 'border-color 0.3s ease',
              boxShadow: 3,
            },
          },
        }}
      >
        <MenuItem onClick={() => {
          setAnchorEl(null);
          router.push('/main/personalinformation');
        }}>Personal Information</MenuItem>
        
        <MenuItem onClick={() => {
          setAnchorEl(null);
          router.push('/main/settings');
        }}>Settings</MenuItem>
        
        <MenuItem onClick={async () => {
          setAnchorEl(null);
          if (onSignOut) {
            onSignOut();
          } else {
            await signOut({ callbackUrl: '/signout' });
          }
        }}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};
