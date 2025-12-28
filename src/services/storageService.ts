// Storage service with fixes - No arrow functions, no 'this' issues

const STORAGE_KEYS = {
  STUDENTS: 'students_list',
  LAST_STUDENT_ID: 'last_student_id'
};

const StorageService = {
  // === Basic student functions ===
  
  getStudents() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading data:', error);
      return [];
    }
  },

  saveStudent(studentData) {
    try {
      let students = this.getStudents();
      const studentIndex = students.findIndex(s => s.idNumber === studentData.idNumber);
      
      const studentToSave = {
        ...studentData,
        id: studentData.id || Date.now(), // Simple ID
        updatedAt: new Date().toLocaleDateString('he-IL')
      };
      
      if (studentIndex >= 0) {
        students[studentIndex] = studentToSave;
      } else {
        studentToSave.createdAt = new Date().toLocaleDateString('he-IL');
        students.push(studentToSave);
      }
      
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
      return true;
    } catch (error) {
      console.error('Error saving student:', error);
      return false;
    }
  },

  deleteStudent(idNumber) {
    try {
      const students = this.getStudents();
      const filtered = students.filter(s => s.idNumber !== idNumber);
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting student:', error);
      return false;
    }
  },

  // === Additional functions ===
  
  getStudentById(idNumber) {
    const students = this.getStudents();
    return students.find(s => s.idNumber === idNumber) || null;
  },

  getStudentsCount() {
    return this.getStudents().length;
  },

  exportData() {
    const data = this.getStudents();
    return JSON.stringify(data, null, 2);
  },

  // Utility for development
  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
  }
};

export default StorageService;
