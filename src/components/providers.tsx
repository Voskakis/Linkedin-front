import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes/default-theme';
import { SessionProvider } from 'next-auth/react';

const ProvidersWrapper = (
  { children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          {children}
        </SessionProvider>  
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default ProvidersWrapper;