import UsersTable from '@/components/UsersTable';
import React from 'react';

export default async function UsersPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <UsersTable />
    </div>
  );
}