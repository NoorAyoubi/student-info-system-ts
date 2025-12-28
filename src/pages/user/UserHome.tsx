import { useEffect, useState } from 'react';
import { Typography, List, ListItem } from '@mui/material';
import { Message } from '../../models/Message';
import { storageService } from '../../services/storageService';

export default function UserHome() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(storageService.get<Message>('messages'));
  }, []);

  return (
    <>
      <Typography variant="h4">הודעות חשובות</Typography>
      <List>
        {messages.map(m => (
          <ListItem key={m.id}>{m.title}</ListItem>
        ))}
      </List>
    </>
  );
}

