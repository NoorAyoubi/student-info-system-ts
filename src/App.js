import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import theme from './theme';
import StudentProfilePage from './pages/StudentProfilePage';
import StudentsManagementPage from './pages/StudentsManagementPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div dir="rtl">
          {/* Navigation Bar */}
          <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Student Management System - College
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  Personal Profile
                </Button>
                <Button
                  component={Link}
                  to="/students"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  Manage Students
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<StudentProfilePage />} />
              <Route path="/student-profile" element={<StudentProfilePage />} />
              <Route path="/students" element={<StudentsManagementPage />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
