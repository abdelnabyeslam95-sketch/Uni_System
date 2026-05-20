import React, { useState } from 'react';
import { BookOpen, User, Clock, Award, DownloadCloud, CheckCircle, Search, Percent, Layers, ShieldCheck } from 'lucide-react';

const RegisteredCourses = () => {
  // 1. بيانات المواد المسجلة بتفاصيل أكاديمية أعمق (نظري، عملي، حالة المادة)
  const [courses] = useState([
    { id: 1, name: "كيمياء حيوية", code: "BC-101", creditHours: 3, type: "نظري + عملي", instructor: "د. أحمد رأفت", attendance: 92, category: "إجباري", status: "مستمرة" },
    { id: 2, name: "فيزياء طبية", code: "MP-102", creditHours: 2, type: "نظري + عملي", instructor: "د. سارة ممدوح", attendance: 85, category: "إجباري", status: "مستمرة" },
    { id: 3, name: "لغة إنجليزية مصطلحات", code: "EN-101", creditHours: 2, type: "نظري فقط", instructor: "أ. منى زكي", attendance: 100, category: "متطلب جامعة", status: "منتهية" },
    { id: 4, name: "رياضيات وإحصاء", code: "MS-103", creditHours: 3, type: "نظري فقط", instructor: "د. محمد علي", attendance: 73, category: "إجباري", status: "إنذار غياب" },
    { id: 5, name: "برمجة الحاسب", code: "CS-105", creditHours: 3, type: "عملي مكثف", instructor: "د. إسلام عبد النبي", attendance: 95, category: "اختياري", status: "مستمرة" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // فلترة المواد بناءً على بحث الطالب
  const filteredCourses = courses.filter(course => 
    course.name.includes(searchTerm) || course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // إحصائيات ديناميكية للوحة العلوية
  const totalHours = courses.reduce((sum, c) => sum + c.creditHours, 0);
  const avgAttendance = Math.round(courses.reduce((sum, c) => sum + c.attendance, 0) / courses.length);

  // دالة لتحديد الألوان بناءً على نسبة الحضور وحالة المادة
  const getStatusConfig = (attendance, status) => {
    if (status === "إنذار غياب" || attendance < 75) {
      return { bar: 'bg-rose-500', text: 'text-rose-600', bg: 'bg-rose-50 border-rose-100', dot: 'bg-rose-500' };
    }
    if (attendance >= 90) {
      return { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', dot: 'bg-emerald-500' };
    }
    return { bar: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', dot: 'bg-blue-500' };
  };

  return (
    <div className="p-6 font-sans space-y-8" dir="rtl">
      
      {/* 1. الهيدر العلوي المطور بتدرج ألوان احترافي */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <BookOpen size={32} /> المقررات الدراسية المسجلة
          </h1>
          <p className="text-blue-50/80 font-bold mt-2 text-sm md:text-base">
            إدارة الخطة الدراسية الحالية، متابعة الساعات المعتمدة، ونسب الحضور والغياب لكل مادة.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
          <ShieldCheck size={20} className="text-teal-200" />
          <span className="font-black text-sm">حالة الاعتماد: موثق أكاديميّاً</span>
        </div>
      </div>

      {/* 2. كروت الإحصائيات الذكية (Dashboard Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* كارد الساعات */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">إجمالي الساعات المسجلة</span>
            <h3 className="text-3xl font-black text-slate-800 font-serif">{totalHours} <span className="text-xs font-black text-slate-400">ساعة معتمدة</span></h3>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Clock size={24} /></div>
        </div>

        {/* كارد عدد المواد */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-200 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">عدد المقررات الحالية</span>
            <h3 className="text-3xl font-black text-slate-800 font-serif">{courses.length} <span className="text-xs font-black text-slate-400">مقررات دراسية</span></h3>
          </div>
          <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl"><Layers size={24} /></div>
        </div>

        {/* كارد متوسط الحضور */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">معدل الحضور العام</span>
            <h3 className="text-3xl font-black text-slate-800 font-serif">{avgAttendance}% <span className="text-xs font-black text-slate-400">نسبة تراكمية</span></h3>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><Percent size={24} /></div>
        </div>
      </div>

      {/* 3. شريط البحث المطور */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 max-w-md hover:border-blue-300 transition-all">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="ابحث باسم المادة أو كود التسجيل..." 
          className="w-full text-sm font-bold bg-transparent border-none outline-none text-slate-700 placeholder-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 4. شبكة عرض كروت المواد بتصميم ألترا مودرن */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const config = getStatusConfig(course.attendance, course.status);

          return (
            <div 
              key={course.id} 
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 space-y-6 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-300 group relative overflow-hidden border-t-4 border-t-blue-600"
            >
              {/* التاجات العلوية وحالة المادة الحالية */}
              <div className="flex justify-between items-center">
                <div className="flex gap-1.5">
                  <span className="text-[10px] font-black px-2.5 py-1 bg-slate-100 text-slate-500 rounded-xl">
                    {course.code}
                  </span>
                  <span className="text-[10px] font-black px-2.5 py-1 bg-blue-50 text-blue-600 rounded-xl">
                    {course.type}
                  </span>
                </div>
                {/* شارة حالة المادة الدقيقة */}
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl border flex items-center gap-1.5 ${config.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
                  {course.status}
                </span>
              </div>

              {/* تفاصيل اسم المادة والمحاضر */}
              <div className="space-y-2">
                <h3 className="font-black text-slate-800 text-xl group-hover:text-blue-600 transition-colors">
                  {course.name}
                </h3>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <User size={14} className="text-slate-300 shrink-0" />
                  <span className="truncate">{course.instructor}</span>
                </div>
              </div>

              {/* الحضور والساعات بتوزيع احترافي ومقروء */}
              <div className="space-y-4 pt-4 border-t border-slate-50 flex-1 flex flex-col justify-end">
                <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> الوزن الأكاديمي</span>
                  <span className="text-slate-700 font-black bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">{course.creditHours} ساعات معتمدة</span>
                </div>

                {/* قسم شريط تقدم الحضور الفخم */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-500 flex items-center gap-1.5"><Award size={14} className="text-slate-400" /> نسبة حضور المحاضرات</span>
                    <span className={`font-black ${config.text}`}>{course.attendance}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${config.bar}`} style={{ width: `${course.attendance}%` }}></div>
                  </div>
                </div>
              </div>

              {/* زر التحميل التفاعلي الخفيف والسلس */}
              <button className="w-full py-3.5 bg-slate-50 hover:bg-blue-50 group-hover:text-blue-600 rounded-2xl font-black text-xs text-slate-500 flex items-center justify-center gap-2 border border-slate-100 transition active:scale-[0.98] mt-2">
                <DownloadCloud size={15} />
                تحميل الدليل والمحتوى العلمي (Syllabus)
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RegisteredCourses;