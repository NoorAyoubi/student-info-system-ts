import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import theme from './theme';
import Header from './components/layout/Header';
import DrawerMenu from './components/layout/DrawerMenu';
import StudentProfilePage from './pages/StudentProfilePage';
import StudentsManagementPage from './pages/StudentsManagementPage';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          
          <Header onMenuClick={toggleDrawer} />
          
          <DrawerMenu open={drawerOpen} onClose={toggleDrawer} />
          
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Routes>
              <Route path="/" element={<StudentProfilePage />} />
              <Route path="/student-profile" element={<StudentProfilePage />} />
              <Route path="/students" element={<StudentsManagementPage />} />
              <Route path="/settings" element={
                <Box sx={{ p: 3 }}>
                  <h2>Settings Page</h2>
                  <p>This is a simple settings page.</p>
                </Box>
              } />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
