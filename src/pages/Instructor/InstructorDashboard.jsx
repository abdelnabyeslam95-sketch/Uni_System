import React, { useState, useEffect } from 'react';
import { Book, Users, Clock, Star, Calendar, ArrowLeft, MessageSquare, AlertCircle } from 'lucide-react';

const InstructorDashboard = () => {
  // 1. حالات البيانات (States)
  const [stats, setStats] = useState({
    totalStudents: 0,
    courseCount: 0,
    rating: 4.9
  });
  const [myCourses, setMyCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // 2. جلب البيانات عند تحميل الصفحة وتصفيتها بدقة
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('university_courses')) || [];
    const savedStudents = JSON.parse(localStorage.getItem('university_students')) || [];
    
    // تصفية المواد لتظهر فقط المواد المسندة للدكتور
    const instructorCourses = savedCourses.filter(c => c.instructor === "د. إسلام عبد النبي"); 
    
    setMyCourses(instructorCourses.length > 0 ? instructorCourses : [
      { id: 1, name: "ذكاء اصطناعي", students: 120, time: "10:00 ص", room: "قاعة 1", code: "AI" },
      { id: 2, name: "هندسة برمجيات", students: 85, time: "01:00 م", room: "معمل 3", code: "SE" }
    ]);

    setStats({
      totalStudents: savedStudents.length || 205,
      courseCount: instructorCourses.length || 2,
      rating: 4.9
    });

    setNotifications([
      { id: 1, text: "يرجى الانتهاء من رصد درجات الميدترم قبل نهاية الأسبوع الحالي.", priority: "high" },
      { id: 2, text: "اجتماع مجلس القسم القادم يوم الثلاثاء في تمام الساعة 10 صباحاً بالقاعة الرئيسية.", priority: "normal" }
    ]);
  }, []);

  // تعديل 1: حل مشكلة الألوان الديناميكية في Tailwind بإنشاء مخرجات ثابتة معرفة مسبقاً
  const colorMap = {
    blue: { bg: 'bg-blue-50 text-blue-600', border: 'hover:border-blue-200' },
    emerald: { bg: 'bg-emerald-50 text-emerald-600', border: 'hover:border-emerald-200' },
    orange: { bg: 'bg-orange-50 text-orange-600', border: 'hover:border-orange-200' }
  };

  return (
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* الترحيب - متجاوب بالكامل */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800">مرحباً، د. إسلام عبد النبي</h1>
          <p className="text-slate-500 font-bold mt-1 text-sm sm:text-base">
            لديك ({stats.courseCount}) محاضرات مسجلة في النظام حالياً.
          </p>
        </div>
        {/* الصورة الرمزية */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-lg shadow-blue-100 shrink-0">
          IS
        </div>
      </div>

      {/* الإحصائيات - Grid متجاوب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {[
          { label: "إجمالي الطلاب", val: stats.totalStudents, icon: <Users size={22}/>, color: "blue" },
          { label: "المواد المسندة", val: stats.courseCount, icon: <Book size={22}/>, color: "emerald" },
          { label: "تقييم الأداء", val: stats.rating, icon: <Star size={22}/>, color: "orange" }
        ].map((item, i) => {
          const styles = colorMap[item.color];
          return (
            <div key={i} className={`bg-white p-5 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 sm:gap-5 transition-colors ${styles.border}`}>
              <div className={`p-4 rounded-2xl shrink-0 ${styles.bg}`}>
                {item.icon}
              </div>
              <div>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{item.label}</p>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">{item.val}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* محتوى الصفحة الرئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* جدول المحاضرات */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <h3 className="font-black text-lg sm:text-xl text-slate-800 flex items-center gap-2">
            <Calendar size={22} className="text-blue-600 shrink-0"/> محاضراتك الحالية
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {myCourses.map((course) => (
              <div key={course.id} className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-slate-200/80 transition-all duration-200">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 text-sm rounded-2xl flex items-center justify-center font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    {course.code || "CR"}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-slate-800 text-sm sm:text-base truncate">{course.name}</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-[11px] font-bold text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={12}/> {course.time || "غير محدد"}</span>
                      <span className="flex items-center gap-1"><Users size={12}/> {course.students} طالب</span>
                      {course.room && <span className="bg-slate-50 px-2 py-0.5 rounded-md text-slate-500 font-black text-[10px]">{course.room}</span>}
                    </div>
                  </div>
                </div>
                {/* تعديل 2: تحويل السهم لليسار ليتناسب مع التوجيه العربي RTL */}
                <button className="p-2.5 sm:p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition shrink-0" title="إدارة المادة">
                  <ArrowLeft size={18}/>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* الإشعارات والتنبيهات */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="font-black text-lg sm:text-xl text-slate-800 flex items-center gap-2">
            <MessageSquare size={22} className="text-orange-500 shrink-0"/> الإشعارات والتوجيهات
          </h3>
          <div className="space-y-4">
            {notifications.map((note) => (
              <div key={note.id} className={`p-5 sm:p-6 rounded-[2rem] border-r-4 shadow-sm transition-all ${note.priority === 'high' ? 'bg-red-50 border-red-500 text-red-950' : 'bg-slate-900 border-blue-500 text-white shadow-slate-100'}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className={`shrink-0 mt-0.5 ${note.priority === 'high' ? 'text-red-600' : 'text-blue-400'}`} />
                  <p className="text-xs sm:text-sm font-bold leading-relaxed">{note.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;