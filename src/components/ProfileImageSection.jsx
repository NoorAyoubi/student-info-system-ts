import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Box,
  Typography, // ✅ Fixed: Added Typography import
} from '@mui/material';
import { Person } from '@mui/icons-material';
import StorageService from '../services/storageService';

const ProfileImageSection = () => {
  const [image, setImage] = useState(StorageService.getProfileImage());

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        // For academic project, we'll skip localStorage for images
        // StorageService.saveProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    // StorageService.removeProfileImage();
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Profile Picture
      </Typography>

      <Avatar
        src={image}
        sx={{
          width: 120,
          height: 120,
          margin: 'auto',
          mb: 2,
          bgcolor: image ? 'transparent' : '#1E73E8',
          border: '2px solid #E5E7EB',
        }}
      >
        {!image && <Person sx={{ fontSize: 60, color: 'white' }} />}
      </Avatar>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {image ? 'Active profile picture' : 'No image uploaded'}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          component="label"
          variant="outlined"
          size="small"
        >
          {image ? 'Change Picture' : 'Upload Picture'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
        
        {image && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleRemoveImage}
          >
            Remove Picture
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProfileImageSection;
