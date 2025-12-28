import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Edit,
  Delete,
  Search,
  Add,
} from '@mui/icons-material';
import StorageService from '../services/storageService';
import ConfirmDialog from '../components/common/ConfirmDialog';

const StudentTable = ({ refreshTrigger }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    student: null,
  });

  useEffect(() => {
    loadStudents();
  }, [refreshTrigger]);

  const loadStudents = () => {
    setStudents(StorageService.getStudents());
  };

  const filteredStudents = students.filter(student => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      student.fullName?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.idNumber?.toLowerCase().includes(searchLower)
    );
  });

  const handleAddStudent = () => {
    navigate('/student-profile');
  };

  const handleEditStudent = (student) => {
    navigate('/student-profile', { state: { studentToEdit: student } });
  };

  const handleDeleteClick = (student) => {
    setDeleteDialog({ open: true, student });
  };

  const confirmDelete = () => {
    if (deleteDialog.student) {
      StorageService.deleteStudent(deleteDialog.student.idNumber);
      loadStudents();
    }
    setDeleteDialog({ open: false, student: null });
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Manage Students
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
            {filteredStudents.length} students
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">
                    {searchTerm ? 'No results found' : 'No students'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student, index) => (
                <TableRow key={student.idNumber} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.fullName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.idNumber}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEditStudent(student)}
                      title="Edit"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(student)}
                      title="Delete"
                      color="error"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={deleteDialog.open}
        title="Delete Student"
        message={`Delete ${deleteDialog.student?.fullName}?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ open: false, student: null })}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </Box>
  );
};

export default StudentTable;
