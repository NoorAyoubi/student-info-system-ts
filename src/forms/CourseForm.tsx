import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Snackbar,
  MenuItem
} from '@mui/material';
import { Course } from '../models/Course';
import { storageService } from '../services/storageService';
import { isCourseCodeValid } from '../utils/validators';

interface Props {
  selected?: Course;
  onSave: () => void;
}

export default function CourseForm({ selected, onSave }: Props) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [credits, setCredits] = useState(0);
  const [semester, setSemester] = useState(1);
  const [open, setOpen] = useState(false);

  const valid =
    isCourseCodeValid(code) &&
    name.trim() !== '' &&
    credits > 0;

  useEffect(() => {
    if (selected) {
      setCode(selected.code);
      setName(selected.name);
      setCredits(selected.credits);
      setSemester(selected.semester);
    }
  }, [selected]);

  const save = () => {
    const list = storageService.get<Course>('courses');

    if (selected) {
      const i = list.findIndex(c => c.id === selected.id);
      list[i] = { ...selected, code, name, credits, semester };
    } else {
      list.push({
        id: Date.now().toString(),
        code,
        name,
        credits,
        semester,
        status: 'פעיל'
      });
    }

    storageService.set('courses', list);
    setOpen(true);
    onSave();
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="קוד קורס"
        value={code}
        required
        error={!isCourseCodeValid(code)}
        helperText="פורמט: CS123"
        onChange={e => setCode(e.target.value)}
      />

      <TextField
        label="שם קורס"
        value={name}
        required
        onChange={e => setName(e.target.value)}
      />

      <TextField
        type="number"
        label='נ"ז'
        value={credits}
        onChange={e => setCredits(+e.target.value)}
      />

      <TextField
        select
        label="סמסטר"
        value={semester}
        onChange={e => setSemester(+e.target.value)}
      >
        {[1,2,3,4,5,6].map(s => (
          <MenuItem key={s} value={s}>{s}</MenuItem>
        ))}
      </TextField>

      <Button disabled={!valid} variant="contained" onClick={save}>
        שמירה
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="קורס נשמר בהצלחה"
        onClose={() => setOpen(false)}
      />
    </Stack>
  );
}

