'use client';

import { Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { usePagination } from '@/lib/contexts/PaginationContext';

export default function TableComponent({rows, columns, loading}: {rows: any[], columns: any[], loading: boolean}) {
  const { paginationModel, pageSizeOptions, setPage, setPageSize} = usePagination();
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableColumnSorting={false}
        pageSizeOptions={pageSizeOptions}
        loading={loading}
        initialState={{ pagination: {paginationModel}}}
        checkboxSelection={true}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
