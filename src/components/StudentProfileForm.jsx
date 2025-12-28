import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography, // ✅ Fixed: Added Typography import
  Alert,
} from '@mui/material';
import StorageService from '../services/storageService';

// Validation schema
const validationSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  idNumber: yup.string().required('ID number is required').length(9, 'Must be 9 digits'),
  phone: yup.string().required('Phone is required').matches(/^05\d{8}$/, 'Must start with 05 and be 10 digits'),
});

const StudentProfileForm = ({ onStudentSaved, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || {
      fullName: 'Sarah Shikha',
      email: 'sara.abo.shikha@gmail.com',
      idNumber: '123456789',
      phone: '0543643884',
    }
  });

  // Initialize with edit data if available
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const onSubmit = (data) => {
    const success = StorageService.saveStudent(data);
    
    if (success) {
      // Notify parent component
      if (onStudentSaved) {
        onStudentSaved(data);
      }
      
      // Success message
      alert('Student saved successfully!');
    }
  };

  const handleReset = () => {
    reset({
      fullName: '',
      email: '',
      idNumber: '',
      phone: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} dir="rtl">
      <Typography variant="h5" gutterBottom>
        Personal Details
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Update your personal information
      </Typography>

      <Box sx={{ mt: 3 }}>
        <TextField
          {...register('fullName')}
          fullWidth
          label="Full Name"
          margin="normal"
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />

        <TextField
          {...register('email')}
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register('idNumber')}
          fullWidth
          label="ID Number"
          margin="normal"
          error={!!errors.idNumber}
          helperText={errors.idNumber?.message || 'This field cannot be edited'}
          InputProps={{
            readOnly: true,
          }}
          sx={{
            '& .MuiInputBase-input': {
              backgroundColor: '#f5f5f5',
              cursor: 'default',
            }
          }}
        />

        <TextField
          {...register('phone')}
          fullWidth
          label="Phone"
          margin="normal"
          placeholder="05xxxxxxxx"
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            Please fix the errors in the form
          </Alert>
        )}

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
          <Button type="button" variant="outlined" onClick={handleReset}>
            Clear
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default StudentProfileForm;
