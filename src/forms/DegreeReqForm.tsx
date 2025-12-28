export interface DegreeRequirement {
  id: string;
  name: string;
  type: 'חובה' | 'בחירה';
  courseIds: string[];
}
