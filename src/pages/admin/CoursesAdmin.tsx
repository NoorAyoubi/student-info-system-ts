import { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Button, Stack, Typography, Paper
} from '@mui/material';
import { Course } from '../../models/Course';
import { storageService } from '../../services/storageService';
import CourseForm from '../../forms/CourseForm';

export default function CoursesAdmin() {
  const [list, setList] = useState<Course[]>([]);
  const [selected, setSelected] = useState<Course>();

  const load = () => {
    setList(storageService.get<Course>('courses'));
    setSelected(undefined);
  };

  useEffect(load, []);

  return (
    <Stack spacing={3}>
      <Typography variant="h4">ניהול קורסים</Typography>

      <Paper sx={{ p: 2 }}>
        <CourseForm selected={selected} onSave={load} />
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>קוד</TableCell>
            <TableCell>שם</TableCell>
            <TableCell>נ"ז</TableCell>
            <TableCell>סמסטר</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(c => (
            <TableRow key={c.id}>
              <TableCell>{c.code}</TableCell>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.credits}</TableCell>
              <TableCell>{c.semester}</TableCell>
              <TableCell>
                <Button onClick={() => setSelected(c)}>עריכה</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}
