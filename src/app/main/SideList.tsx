import React from "react";
import {
  Home as HomeIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';
import SideListElement from "@/lib/interfaces/SideListElement";

export const sideList: SideListElement[] = [
  {
    label: 'Feed',
    icon: <HomeIcon />,
    route: '/main/feed'
  },
]

export const adminSideList: SideListElement[] = [
  {
    label: 'Users',
    icon: <ManageAccountsIcon />,
    route: '/main/users'
  },
]