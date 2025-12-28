import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Header from './components/layout/Header';
import AppRoutes from './routes/AppRoutes';
import { useEffect } from 'react';
import { loadInitialData } from './data/initialData';

export default function App() {
  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <AppRoutes />
    </ThemeProvider>
  );
}

