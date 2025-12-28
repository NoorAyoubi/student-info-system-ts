import { Course } from '../models/Course';

export function loadInitialData() {
  if (!localStorage.getItem('courses')) {
    const courses: Course[] = Array.from({ length: 10 }, (_, i) => ({
      id: `CS${100 + i}`,
      name: `קורס ${i + 1}`,
      syllabus: 'תיאור קורס לדוגמה',
      status: 'active'
    }));

    localStorage.setItem('courses', JSON.stringify(courses));
  }
}
