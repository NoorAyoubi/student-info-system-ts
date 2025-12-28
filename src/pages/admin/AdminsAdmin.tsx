import { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Button, Stack, Typography, Paper
} from '@mui/material';
import { Admin } from '../../models/Admin';
import { storageService } from '../../services/storageService';
import AdminForm from '../../forms/AdminForm';

export default function AdminsAdmin() {
  const [list, setList] = useState<Admin[]>([]);
  const [selected, setSelected] = useState<Admin>();

  const load = () => {
    setList(storageService.get<Admin>('admins'));
    setSelected(undefined);
  };

  useEffect(load, []);

  return (
    <Stack spacing={3}>
      <Typography variant="h4">ניהול מנהלים</Typography>

      <Paper sx={{ p: 2 }}>
        <AdminForm selected={selected} onSave={load} />
      </Paper>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>שם</TableCell>
            <TableCell>אימייל</TableCell>
            <TableCell>תפקיד</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(a => (
            <TableRow key={a.id}>
              <TableCell>{a.fullName}</TableCell>
              <TableCell>{a.email}</TableCell>
              <TableCell>{a.role}</TableCell>
              <TableCell>
                <Button onClick={() => setSelected(a)}>עריכה</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

