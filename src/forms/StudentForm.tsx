import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Stack,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { Student } from '../models/Student';
import { storageService } from '../services/storageService';

interface Props {
  selectedStudent?: Student;
  onSave: () => void;
}

export default function StudentForm({ selectedStudent, onSave }: Props) {
  const [student, setStudent] = useState<Student>({
    id: '',
    fullName: '',
    email: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({
    id: '',
    fullName: '',
    email: ''
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      setStudent(selectedStudent);
    }
  }, [selectedStudent]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = { id: '', fullName: '', email: '' };
    let valid = true;

    if (!student.id.trim()) {
      newErrors.id = 'ת"ז הוא שדה חובה';
      valid = false;
    } else {
      const students = storageService.get<Student>('students');
      const exists = students.some(
        s => s.id === student.id && s.id !== selectedStudent?.id
      );
      if (exists) {
        newErrors.id = 'ת"ז כבר קיימת במערכת';
        valid = false;
      }
    }

    if (!student.fullName.trim()) {
      newErrors.fullName = 'שם מלא הוא שדה חובה';
      valid = false;
    }

    if (!validateEmail(student.email)) {
      newErrors.email = 'כתובת מייל לא תקינה';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (selectedStudent) {
      storageService.update<Student>('students', student);
    } else {
      storageService.add<Student>('students', student);
    }

    setSuccess(true);
    onSave();

    setStudent({
      id: '',
      fullName: '',
      email: '',
      status: 'active'
    });
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      <TextField
        label="תעודת זהות"
        value={student.id}
        required
        error={!!errors.id}
        helperText={errors.id}
        onChange={e => setStudent({ ...student, id: e.target.value })}
        disabled={!!selectedStudent}
      />

      <TextField
        label="שם מלא"
        value={student.fullName}
        required
        error={!!errors.fullName}
        helperText={errors.fullName}
        onChange={e => setStudent({ ...student, fullName: e.target.value })}
      />

      <TextField
        label="מייל"
        value={student.email}
        required
        error={!!errors.email}
        helperText={errors.email}
        onChange={e => setStudent({ ...student, email: e.target.value })}
      />

      <TextField
        select
        label="סטטוס"
        value={student.status}
        onChange={e =>
          setStudent({ ...student, status: e.target.value as any })
        }
      >
        <MenuItem value="active">פעיל</MenuItem>
        <MenuItem value="finished">סיים</MenuItem>
      </TextField>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!student.id || !student.fullName || !student.email}
      >
        שמירה
      </Button>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">הסטודנט נשמר בהצלחה</Alert>
      </Snackbar>
    </Stack>
  );
}
