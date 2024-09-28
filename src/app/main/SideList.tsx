import React from "react";
import {
  Home as HomeIcon,
  ManageAccounts as ManageAccountsIcon,
  People as PeopleIcon,
  AdUnits as AdUnitsIcon,
  Forum as ForumIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import SideListElement from "@/lib/interfaces/SideListElement";

export const sideList: SideListElement[] = [
  {
    label: 'Home',
    icon: <HomeIcon />,
    route: '/main/feed',
  },
  {
    label: 'Network',
    icon: <PeopleIcon />,
    route: '/main/network',
  },
  {
    label: 'Ads',
    icon: <AdUnitsIcon />,
    route: '/main/ads',
  },
  {
    label: 'Discussions',
    icon: <ForumIcon />,
    route: '/main/discussions',
  },
  {
    label: 'Notifications',
    icon: <NotificationsIcon />,
    route: '/main/notifications',
  },
];

export const adminSideList: SideListElement[] = [
  {
    label: 'Users',
    icon: <ManageAccountsIcon />,
    route: '/main/users'
  },
]