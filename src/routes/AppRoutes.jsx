import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layouts/DashboardLayout';

// === 1. الصفحات العامة ===
import AuthPage from '../pages/Shared/Login'; 

// === 2. صفحات الإدارة (Admin) ===
import AdminDashboard from '../pages/Admin/Dashboard';
import Students from '../pages/Admin/Students';
import Faculties from '../pages/Admin/Faculties';
import Courses from '../pages/Admin/Courses';
import StaffManagement from '../pages/Admin/StaffManagement';
import Schedules from '../pages/Admin/Schedules';
import Finance from '../pages/Admin/Finance';
import Reports from '../pages/Admin/Reports';

// === 3. صفحات الدكتور (Instructor) ===
import InstructorDashboard from '../pages/Instructor/InstructorDashboard';
import Grading from '../pages/Instructor/Grading';
import CourseContent from '../pages/Instructor/CourseContent';
import Attendance from '../pages/Instructor/Attendance';
import Schedule from '../pages/Instructor/Schedule';

// === 4. صفحات الطالب (Student) ===
import StudentDashboard from '../pages/Student/StudentDashboard';
import Schedulee from '../pages/Student/Schedulee'; // ملف جدول الطالب المعدل
import MyGrades from '../pages/Student/MyGrades'; // ملف درجات الطالب الجديد
import RegisteredCourses from '../pages/Student/RegisteredCourses';
const AppRoutes = () => {
  return (
    <Routes>
      {/* صفحة الدخول - تظهر كصفحة مستقلة */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />

      {/* جميع صفحات النظام "المحمية" تندرج تحت الـ Layout الموحد */}
      <Route element={<DashboardLayout />}>
        
        {/* --- مسارات الإدارة (Admin Routes) --- */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/faculties" element={<Faculties />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/staff" element={<StaffManagement />} />
        <Route path="/admin/schedules" element={<Schedules />} />
        <Route path="/admin/finance" border element={<Finance />} />
        <Route path="/admin/reports" element={<Reports />} />
        
        {/* --- مسارات الدكتور (Instructor Routes) --- */}
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/grading" element={<Grading />} />
        <Route path="/instructor/coursecontent" element={<CourseContent />} />
        <Route path="/instructor/attendance" element={<Attendance />} />
        <Route path="/instructor/schedule" element={<Schedule />} />
        
        {/* --- مسارات الطالب (Student Routes) --- */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/schedulee" element={<Schedulee />} />
        <Route path="/student/grades" element={<MyGrades />} />
        <Route path="/student/courses" element={<RegisteredCourses />} />

      </Route>

      {/* توجيه أي مسار غير معروف إلى الصفحة الرئيسية */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;