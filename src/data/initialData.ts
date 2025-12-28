 import { Course } from '../models/Course';
import { DegreeRequirement } from '../models/DegreeRequirement';

export const initialDegreeReqs: DegreeRequirement[] = [
  { id: '1', name: 'מתמטיקה בסיסית', type: 'חובה', courseIds: [] },
  { id: '2', name: 'מבוא למדמ"ח', type: 'חובה', courseIds: [] },
  { id: '3', name: 'אלגוריתמים', type: 'חובה', courseIds: [] },
  { id: '4', name: 'מבני נתונים', type: 'חובה', courseIds: [] },
  { id: '5', name: 'מערכות הפעלה', type: 'חובה', courseIds: [] },
  { id: '6', name: 'פיתוח ווב', type: 'בחירה', courseIds: [] },
  { id: '7', name: 'AI', type: 'בחירה', courseIds: [] },
  { id: '8', name: 'סייבר', type: 'בחירה', courseIds: [] },
  { id: '9', name: 'גרפיקה', type: 'בחירה', courseIds: [] },
  { id: '10', name: 'פרויקט גמר', type: 'חובה', courseIds: [] }
 


];
import { Course } from '../models/Course';

export const initialCourses: Course[] = [
  { id:'1', code:'CS101', name:'Intro', credits:3, semester:1, status:'פעיל' },
  { id:'2', code:'CS102', name:'Math', credits:4, semester:1, status:'פעיל' },
  { id:'3', code:'CS201', name:'Algo', credits:4, semester:2, status:'פעיל' },
  { id:'4', code:'CS202', name:'Data', credits:3, semester:2, status:'פעיל' },
  { id:'5', code:'CS301', name:'OS', credits:4, semester:3, status:'פעיל' },
  { id:'6', code:'CS302', name:'DB', credits:3, semester:3, status:'פעיל' },
  { id:'7', code:'CS401', name:'Web', credits:3, semester:4, status:'פעיל' },
  { id:'8', code:'CS402', name:'AI', credits:3, semester:4, status:'פעיל' },
  { id:'9', code:'CS403', name:'Cyber', credits:3, semester:5, status:'פעיל' },
  { id:'10', code:'CS499', name:'Project', credits:6, semester:6, status:'פעיל' }
];

