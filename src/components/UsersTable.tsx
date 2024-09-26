'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Table from './Table';

export default function UsersTable() {
  const { data, status } = useSession();
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(data)
        const response = await axios.get(`https://localhost:7164/api/users`, {
          headers: {
            Authorization: `Bearer ${data?.user.AccessToken}`
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
  }, [data, data?.user.AccessToken]);

  return (
    <div>
      <Table rows={rows} columns={columns} loading={loading} />
    </div>
  );
};
