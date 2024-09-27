'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { TextField, Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function UsersTable() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (status === 'authenticated' && session?.user.AccessToken) {
        try {
          setLoading(true);
          const response = await axios.get('https://localhost:7164/api/Users', {
            headers: {
              Authorization: `Bearer ${session.user.AccessToken}`,
            },
          });
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

  const handleEditClick = (id: number) => {
    console.log(`Edit user with ID: ${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 50 },
    { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 100 },
    { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 100 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="secondary"
          onClick={() => handleEditClick(params.row.id)}
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
    <div style={{ height: 500, width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search users by name, phone number, or email"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
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
    </div>
  );
}
