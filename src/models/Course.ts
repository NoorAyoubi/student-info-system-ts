export interface Course {
  id: string;
  code: string;        // CS101
  name: string;
  credits: number;     // נ"ז
  semester: number;    // סמסטר
  syllabus?: string;
  status: 'פעיל' | 'לא פעיל';
}
