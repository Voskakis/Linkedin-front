import UsersTable from '@/components/UsersTable';
import { Dashboard } from '@mui/icons-material';
import React from 'react';

export default async function UsersPage() {
  return (
    <Dashboard className="flex min-h-screen flex-col items-center justify-between p-24">
      <UsersTable />
    </Dashboard>
  );
}