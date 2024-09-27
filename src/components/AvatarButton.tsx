import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Person as PersonIcon } from '@mui/icons-material';

interface UserMenuProps {
  onSignOut?: () => void;
  additionalMenuItems?: React.ReactNode;
}

const UserMenu: React.FC<UserMenuProps> = ({ onSignOut, additionalMenuItems }) => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    handleMenuClose();
    if (onSignOut) {
      onSignOut();
    } else {
      await signOut({ callbackUrl: '/signout' });
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Avatar alt={session?.user?.FirstName} src={session?.user?.image || undefined}>
          <PersonIcon />
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleMenuClose}>See Profile</MenuItem>
        {additionalMenuItems}
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
