import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Person,
  People,
  Settings,
  Logout,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
  width?: number;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose, width = 240 }) => {
  const menuItems = [
    { text: 'Student Profile', icon: <Person />, path: '/student-profile' },
    { text: 'Manage Students', icon: <People />, path: '/students' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: width, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            onClick={onClose}
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider />
      
      <List>
        <ListItem button onClick={() => alert('Logging out...')}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default DrawerMenu;
