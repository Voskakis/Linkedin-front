import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes/default-theme';
import { SessionProvider } from 'next-auth/react';
import { PaginationProvider } from '@/lib/contexts/PaginationContext';

const ProvidersWrapper = (
  { children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <PaginationProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </PaginationProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default ProvidersWrapper;