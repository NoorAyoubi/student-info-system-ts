import { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import { DegreeRequirement } from '../../models/DegreeRequirement';
import { storageService } from '../../services/storageService';

export default function DegreeReqUser() {
  const [list, setList] = useState<DegreeRequirement[]>([]);

  useEffect(() => {
    setList(storageService.get<DegreeRequirement>('degreeReqs'));
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h4">דרישות תואר</Typography>

      <List>
        {list.map(req => (
          <ListItem key={req.id}>
            <ListItemText primary={req.name} />
            <Chip label={req.type} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

