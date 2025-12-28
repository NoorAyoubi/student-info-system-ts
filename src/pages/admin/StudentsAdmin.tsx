import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography
} from '@mui/material';
import { Student } from '../../models/Student';
import { storageService } from '../../services/storageService';
import StudentForm from '../../forms/StudentForm';

export default function StudentsAdmin() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

  const loadStudents = () => {
    setStudents(storageService.get<Student>('students'));
    setSelectedStudent(undefined);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Typography variant="h5">ניהול סטודנטים</Typography>

      <StudentForm
        selectedStudent={selectedStudent}
        onSave={loadStudents}
      />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ת"ז</TableCell>
              <TableCell>שם</TableCell>
              <TableCell>מייל</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>פעולות</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map(student => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.status}</TableCell>
                <TableCell>
                  <Button onClick={() => setSelectedStudent(student)}>
                    עריכה
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
}
