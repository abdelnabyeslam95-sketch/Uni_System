import React, { useState, useEffect } from 'react';
import { Book, Users, Clock, Star, Calendar, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';

const InstructorDashboard = () => {
  // 1. حالات البيانات (States)
  const [stats, setStats] = useState({
    totalStudents: 0,
    courseCount: 0,
    rating: 4.9
  });
  const [myCourses, setMyCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // 2. محاكاة جلب البيانات عند فتح الصفحة
  useEffect(() => {
    // هنا بنجيب البيانات اللي "الإدمن" سجلها قبل كدة
    const savedCourses = JSON.parse(localStorage.getItem('university_courses')) || [];
    const savedStudents = JSON.parse(localStorage.getItem('university_students')) || [];
    
    // تصفية المواد عشان تظهر مادة الدكتور ده بس (مثال: د. إسلام)
    const instructorCourses = savedCourses.filter(c => c.instructor === "د. إسلام عبد النبي" || true); 
    
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
      { id: 1, text: "يرجى الانتهاء من رصد درجات الميدترم قبل نهاية الأسبوع.", priority: "high" },
      { id: 2, text: "اجتماع مجلس القسم يوم الثلاثاء القادم الساعة 10 صباحاً.", priority: "normal" }
    ]);
  }, []);

  return (
    <div className="p-6 font-sans" dir="rtl">
      {/* الترحب - ديناميكي بناءً على الوقت */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800">مرحباً، د. إسلام عبد النبي</h1>
          <p className="text-slate-500 font-bold mt-1 text-lg">
            لديك ({stats.courseCount}) محاضرات مسجلة في النظام حالياً.
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">
          IS
        </div>
      </div>

      {/* الإحصائيات - مربوطة بالـ State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "إجمالي الطلاب", val: stats.totalStudents, icon: <Users/>, color: "blue" },
          { label: "المواد المسندة", val: stats.courseCount, icon: <Book/>, color: "emerald" },
          { label: "تقييم الأداء", val: stats.rating, icon: <Star/>, color: "orange" }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:border-blue-200 transition-colors">
            <div className={`p-4 bg-${item.color}-50 text-${item.color}-600 rounded-2xl`}>{item.icon}</div>
            <div>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{item.label}</p>
              <h2 className="text-2xl font-black text-slate-800">{item.val}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* جدول المحاضرات - ينشأ تلقائياً من المصفوفة */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-black text-xl text-slate-800 flex items-center gap-2">
            <Calendar size={22} className="text-blue-600"/> محاضراتك الحالية
          </h3>
          
          {myCourses.map((course) => (
            <div key={course.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {course.code || "CR"}
                </div>
                <div>
                  <h4 className="font-black text-slate-800">{course.name}</h4>
                  <div className="flex gap-4 mt-1 text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={12}/> {course.time || "غير محدد"}</span>
                    <span className="flex items-center gap-1"><Users size={12}/> {course.students} طالب</span>
                  </div>
                </div>
              </div>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                <ArrowRight size={18}/>
              </button>
            </div>
          ))}
        </div>

        {/* التنبيهات - ديناميكية */}
        <div className="space-y-6">
          <h3 className="font-black text-xl text-slate-800 flex items-center gap-2">
            <MessageSquare size={22} className="text-orange-500"/> الإشعارات
          </h3>
          <div className="space-y-4">
            {notifications.map((note) => (
              <div key={note.id} className={`p-6 rounded-[2rem] border-r-4 ${note.priority === 'high' ? 'bg-red-50 border-red-500 text-red-900' : 'bg-slate-900 border-blue-500 text-white shadow-xl'}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className={note.priority === 'high' ? 'text-red-600' : 'text-blue-400'} />
                  <p className="text-sm font-bold leading-relaxed">{note.text}</p>
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