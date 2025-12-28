import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  MenuItem,
  Snackbar
} from '@mui/material';
import { DegreeRequirement } from '../models/DegreeRequirement';
import { storageService } from '../services/storageService';

interface Props {
  selected?: DegreeRequirement;
  onSave: () => void;
}

export default function DegreeReqForm({ selected, onSave }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'חובה' | 'בחירה'>('חובה');
  const [open, setOpen] = useState(false);

  const isValid = name.trim() !== '';

  useEffect(() => {
    if (selected) {
      setName(selected.name);
      setType(selected.type);
    } else {
      setName('');
      setType('חובה');
    }
  }, [selected]);

  const handleSave = () => {
    if (!isValid) return;

    const list = storageService.get<DegreeRequirement>('degreeReqs');

    if (selected) {
      const index = list.findIndex(d => d.id === selected.id);
      list[index] = { ...selected, name, type };
      storageService.set('degreeReqs', list);
    } else {
      list.push({
        id: Date.now().toString(),
        name,
        type,
        courseIds: []
      });
      storageService.set('degreeReqs', list);
    }

    setOpen(true);
    onSave();
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="שם הדרישה"
        value={name}
        required
        error={!isValid}
        helperText={!isValid ? 'שדה חובה' : ''}
        onChange={e => setName(e.target.value)}
      />

      <TextField
        select
        label="סוג"
        value={type}
        onChange={e => setType(e.target.value as any)}
      >
        <MenuItem value="חובה">חובה</MenuItem>
        <MenuItem value="בחירה">בחירה</MenuItem>
      </TextField>

      <Button
        variant="contained"
        disabled={!isValid}
        onClick={handleSave}
      >
        שמירה
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        message="הדרישה נשמרה בהצלחה"
        onClose={() => setOpen(false)}
      />
    </Stack>
  );
}
