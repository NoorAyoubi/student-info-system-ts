import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Container,
  Alert,
  Typography, // ✅ Fixed: Using MUI Typography
} from '@mui/material';
import StudentProfileForm from '../components/StudentProfileForm';
import ProfileImageSection from '../components/ProfileImageSection';
import StatisticsBar from '../components/StatisticsBar';

const StudentProfilePage = () => {
  const location = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);

  // Check for edit data
  useEffect(() => {
    if (location.state?.studentToEdit) {
      setInitialFormData(location.state.studentToEdit);
    }
  }, [location.state]);

  const handleStudentSaved = () => {
    // Update components
    setRefreshKey(prev => prev + 1);
    
    // Show success
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Container maxWidth="lg">
      {/* Success message */}
      {showSuccess && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          onClose={() => setShowSuccess(false)}
        >
          Data saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <StudentProfileForm 
              onStudentSaved={handleStudentSaved}
              initialData={initialFormData}
            />
          </Paper>
        </Grid>

        {/* Profile Picture */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
            <ProfileImageSection />
          </Paper>
        </Grid>
      </Grid>

      {/* Statistics */}
      <StatisticsBar 
        refreshTrigger={refreshKey}
        showSuccess={showSuccess}
      />

      {/* Technical info */}
      <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  🗃️ Data saved in Local Storage
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, bgcolor: '#f0f9ff', borderRadius: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  ✅ Field validation for all inputs
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

// ✅ REMOVED: No recursive Typography definition
export default StudentProfilePage;
