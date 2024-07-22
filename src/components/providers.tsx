import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/themes/default-theme';

const ProvidersWrapper = (
  { children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default ProvidersWrapper;