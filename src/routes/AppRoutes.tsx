import { Routes, Route } from 'react-router-dom';
import AdminHome from '../pages/admin/AdminHome';
import CoursesAdmin from '../pages/admin/CoursesAdmin';
import StudentsAdmin from '../pages/admin/StudentsAdmin';
import DegreeReqAdmin from '../pages/admin/DegreeReqAdmin';
import MessagesAdmin from '../pages/admin/MessagesAdmin';
import AdminsAdmin from '../pages/admin/AdminsAdmin';
import UserHome from '../pages/user/UserHome';
import DegreeReqUser from '../pages/user/DegreeReqUser';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/courses" element={<CoursesAdmin />} />
      <Route path="/admin/students" element={<StudentsAdmin />} />
      <Route path="/admin/degree-reqs" element={<DegreeReqAdmin />} />
      <Route path="/admin/messages" element={<MessagesAdmin />} />
      <Route path="/admin/admins" element={<AdminsAdmin />} />
      <Route path="/degree-reqs" element={<DegreeReqUser />} />
    </Routes>
  );
}
