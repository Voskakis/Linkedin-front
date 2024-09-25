'use client'

import React, { createContext, useState, useEffect, useContext } from 'react';

interface PaginationContextType {
  paginationModel: { page: number; pageSize: number };
  pageSizeOptions: number[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [pageSizeOptions, setPageSizeOptions] = useState<number[]>([5, 10]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setPaginationModel((prev) => ({ ...prev, pageSize: 5 }));
        setPageSizeOptions([5, 10]);
      } else if (width < 960) {
        setPaginationModel((prev) => ({ ...prev, pageSize: 10 }));
        setPageSizeOptions([10, 20]);
      } else {
        setPaginationModel((prev) => ({ ...prev, pageSize: 20 }));
        setPageSizeOptions([20, 50]);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setPage = (page: number) => {
    setPaginationModel((prev) => ({ ...prev, page }));
  };

  const setPageSize = (pageSize: number) => {
    setPaginationModel((prev) => ({ ...prev, pageSize }));
  };

  return (
    <PaginationContext.Provider value={{ paginationModel, pageSizeOptions, setPage, setPageSize }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};
