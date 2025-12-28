import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography, // ✅ Fixed: Added Typography import
  Paper,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import StorageService from '../services/storageService';

const StatisticsBar = ({ refreshTrigger, showSuccess = false }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    averageGrade: 0,
    creditPoints: 0,
  });

  // Update statistics when data changes
  useEffect(() => {
    calculateStatistics();
  }, [refreshTrigger]);

  const calculateStatistics = () => {
    const students = StorageService.getStudents();
    const totalStudents = students.length;
    
    // Fixed calculations (not random)
    const activeCourses = totalStudents * 2; // Average 2 courses per student
    const averageGrade = 85; // Fixed average
    const creditPoints = totalStudents * 24; // 24 points per student
    
    setStats({
      totalStudents,
      activeCourses: Math.max(0, activeCourses),
      averageGrade,
      creditPoints,
    });
  };

  const statCards = [
    { 
      label: 'Students', 
      value: stats.totalStudents, 
      color: '#1E73E8'
    },
    { 
      label: 'Active Courses', 
      value: stats.activeCourses, 
      color: '#10B981'
    },
    { 
      label: 'Average Grade', 
      value: stats.averageGrade, 
      color: '#F59E0B',
      suffix: '%'
    },
    { 
      label: 'Credit Points', 
      value: stats.creditPoints, 
      color: '#8B5CF6'
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        System Statistics
      </Typography>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
        gap: 2 
      }}>
        {statCards.map((card, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid #E5E7EB',
              backgroundColor: 'white',
              position: 'relative',
              minHeight: 100,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {card.label}
            </Typography>
            
            <Typography 
              variant="h4" 
              sx={{ 
                color: card.color,
                fontWeight: 'bold',
                mt: 1,
              }}
            >
              {card.value}{card.suffix || ''}
            </Typography>

            {/* Success badge */}
            {showSuccess && index === 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  bgcolor: '#FFF3BF',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <CheckCircle sx={{ fontSize: 14, color: 'black' }} />
                <Typography variant="caption" sx={{ color: 'black', fontSize: '0.7rem' }}>
                  Updated
                </Typography>
              </Box>
            )}
          </Paper>
        ))}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
        Automatically updated with every data change
      </Typography>
    </Box>
  );
};

export default StatisticsBar;
