'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Table from './Table';

export function UsersTable() {
  const { data: session } = useSession();
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://localhost:7164/users`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          }
        });
        const users = response.data;

        if (users.length > 0) {
          setColumns(Object.keys(users[0]));
          setRows(users);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.accessToken]);

  return (
    <div>
      <Table rows={rows} columns={columns} loading={loading} />
    </div>
  );
};
