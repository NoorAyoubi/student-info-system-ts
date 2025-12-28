import { useEffect, useState } from 'react';
import { TextField, Button, Stack, Snackbar } from '@mui/material';
import { Message } from '../models/Message';
import { storageService } from '../services/storageService';

interface Props {
  selected?: Message;
  onSave: () => void;
}

export default function MessageForm({ selected, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const valid = title.trim() !== '' && content.trim() !== '';

  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setContent(selected.content);
    }
  }, [selected]);

  const save = () => {
    const list = storageService.get<Message>('messages');

    if (selected) {
      const i = list.findIndex(m => m.id === selected.id);
      list[i] = { ...selected, title, content };
    } else {
      list.push({
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toLocaleDateString()
      });
    }

    storageService.set('messages', list);
    setOpen(true);
    onSave();
  };

  return (
    <Stack spacing={2}>
      <TextField label="כותרת" required value={title} onChange={e => setTitle(e.target.value)} />
      <TextField label="תוכן" required multiline rows={3} value={content} onChange={e => setContent(e.target.value)} />
      <Button variant="contained" disabled={!valid} onClick={save}>שמירה</Button>

      <Snackbar open={open} autoHideDuration={3000} message="הודעה נשמרה" onClose={() => setOpen(false)} />
    </Stack>
  );
}

