import { Student } from '../models/Student';

if (!localStorage.getItem('students')) {
  const students: Student[] = Array.from({ length: 10 }, (_, i) => ({
    id: `30000000${i}`,
    fullName: `סטודנט ${i + 1}`,
    email: `student${i + 1}@mail.com`,
    status: 'active'
  }));

  localStorage.setItem('students', JSON.stringify(students));
}
