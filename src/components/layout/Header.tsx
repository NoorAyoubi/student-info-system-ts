import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'College Management System' }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/student-profile"
            sx={{ textDecoration: 'none' }}
          >
            Profile
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/students"
            sx={{ textDecoration: 'none' }}
          >
            Students
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
