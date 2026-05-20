import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, 
  ClipboardCheck, Calendar, Wallet, ShieldCheck, 
  Settings, FileText, Monitor, UserCheck, BarChart3 
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const location = useLocation();

  // تعريف جميع القوائم لكل الرتب بناءً على التصميم القوي
  const menuConfig = {
    admin: [
      { type: 'header', title: 'إدارة المنظومة' },
      { title: "لوحة التحكم", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
      { title: "إدارة الكليات", path: "/admin/faculties", icon: <GraduationCap size={20} /> },
      { title: "المواد الدراسية", path: "/admin/courses", icon: <BookOpen size={20} /> },
      { title: "أعضاء هيئة التدريس", path: "/admin/staff", icon: <UserCheck size={20} /> },
      { title: "شؤون الطلاب", path: "/admin/students", icon: <Users size={20} /> },
      { type: 'header', title: 'التشغيل والمالية' },
  { title: "الجداول الدراسية", path: "/admin/schedules", icon: <Calendar size={20} /> },
  { title: "الخزينة والمالية", path: "/admin/finance", icon: <Wallet size={20} /> },
  { type: 'header', title: 'التقارير والذكاء الاصطناعي' },
  { title: "التقارير", path: "/admin/reports", icon: <FileText size={20} /> },
      { type: 'header', title: 'الإعدادات' },
      { title: "إعدادات النظام", path: "/admin/settings", icon: <Settings size={20} /> },
    ],
    instructor: [
      { type: 'header', title: 'البوابة الأكاديمية' },
      { title: "لوحه التحكم", path: "/instructor/dashboard", icon: <BookOpen size={20} /> },
      { title: "المواد الدراسية", path: "/instructor/coursecontent", icon: <BookOpen size={20} /> },
      { title: "رصد الدرجات", path: "/instructor/grading", icon: <ClipboardCheck size={20} /> },
      { title: "الحضور والغياب  ", path: "/instructor/attendance", icon: <BookOpen size={20} /> },
      { title: "جدول المحاضرات", path: "/instructor/schedule", icon: <Calendar size={20} /> },
    ],
    ta: [
      { type: 'header', title: 'بوابة المعيدين' },
      { title: "السكاشن العملية", path: "/ta/sections", icon: <Monitor size={20} /> },
      { title: "تسجيل الحضور", path: "/ta/attendance", icon: <UserCheck size={20} /> },
      { title: "تكليفات الطلاب", path: "/ta/assignments", icon: <FileText size={20} /> },
    ],
    staff: [
      { type: 'header', title: 'الإدارة المالية والطلابية' },
      { title: "شؤون الطلاب", path: "/admin/students", icon: <Users size={20} /> },
      { title: "الخزينة والحسابات", path: "/staff/finance", icon: <Wallet size={20} /> },
      { title: "التقارير المالية", path: "/staff/reports", icon: <BarChart3 size={20} /> },
    ],
    student: [
      { type: 'header', title: 'بوابة الطالب' },
      { title: "لوحه التحكم", path: "/student/dashboard", icon: <BookOpen size={20} /> },
      { title: "الجدول الدراسي", path: "/student/schedulee", icon: <Calendar size={20} /> },
      { title: "المواد المسجلة", path: "/student/courses", icon: <BookOpen size={20} /> },
      { title: "نتائج الاختبارات", path: "/student/grades", icon: <FileText size={20} /> },
    ]
  };

  const currentMenu = menuConfig[role] || [];

  return (
    <div className="w-72 bg-white h-screen border-l border-slate-100 flex flex-col shadow-xl z-20" dir="rtl">
      {/* Logo Section */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">UNI-SYS</h1>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
        {currentMenu.map((item, index) => {
          if (item.type === 'header') {
            return (
              <p key={index} className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-4 mt-8 mb-4">
                {item.title}
              </p>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold mb-1 ${
                location.pathname === item.path 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span className={location.pathname === item.path ? "text-white" : "text-slate-400"}>
                {item.icon}
              </span>
              <span className="text-[14px]">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Side */}
      <div className="p-6 border-t border-slate-50">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <p className="text-[11px] font-bold text-slate-500 uppercase">مؤمن بالكامل - V 2.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;