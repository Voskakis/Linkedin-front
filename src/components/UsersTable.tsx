'use client';

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { TextField, Box, Button, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';
import ExportDialog from './ExportFileDialog';
import authedAxios from '@/lib/axios';

export default function UsersTable() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      if (status === 'authenticated' && session?.user.AccessToken) {
        try {
          setLoading(true);
          const response = await authedAxios.get('/api/Users');
          setUsers(response.data);
          setFilteredUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsers();
  }, [status, session]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter(user =>
      Object.values(user).some(value =>
        String(value).toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => router.push(`/main/users/${params.row.id}`)}
        >
          <SettingsIcon />
        </IconButton>
      ),
    },
  ];
  if (status === 'loading') {
    return <p>Loading session...</p>;
  }
  if (status === 'unauthenticated') {
    return <p>Please sign in to view the users.</p>;
  }
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search users by name, phone number, or email"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setExportDialogOpen(true)}
          disabled={selectedUserIds.length === 0}
        >
          Export Selected
        </Button>
      </Box>
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        loading={loading}
        checkboxSelection
        autoHeight
        onRowSelectionModelChange={x => setSelectedUserIds(x as number[])}
        disableColumnResize={false}
      />
      <ExportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        onExport={(exportType: string, selectedCategories: any) => {
          //TODO
          const selectedUsersData = users.filter(user => selectedUserIds.includes(user.id));
          console.log('Selected export type:', exportType);
          console.log('Selected categories:', selectedCategories);
          console.log('Selected users data:', selectedUsersData);
        }}
      />
    </div>
  );
}
