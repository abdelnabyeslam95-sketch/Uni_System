import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar as CalendarIcon, BookOpen, AlertCircle } from 'lucide-react';

const InstructorSchedule = () => {
  // 1. تعريف أيام الأسبوع الأساسية
  const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
  
  // 2. حالة الجدول (State)
  const [weeklySchedule, setWeeklySchedule] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة جلب البيانات من السيستم (localStorage)
    const fetchSchedule = () => {
      try {
        // بنجيب كل الجداول اللي الإدمن سجلها في صفحة Schedules
        const allSchedules = JSON.parse(localStorage.getItem('university_schedules')) || [];
        
        /* تصفية الجداول: هنجيب فقط المواد اللي الدكتور بتاعها هو "د. إسلام" 
           (تأكد إن اسم الدكتور في صفحة الإدمن مطابق للاسم هنا)
        */
        const myClasses = allSchedules.filter(item => 
          item.instructor === "د. إسلام عبد النبي" || item.instructor === "إسلام عبد النبي"
        );

        // تنظيم البيانات في شكل "يوم -> محاضرات"
        const organized = {};
        days.forEach(day => {
          organized[day] = myClasses.filter(c => c.day === day);
        });

        setWeeklySchedule(organized);
      } catch (error) {
        console.error("Error loading schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="p-6 font-sans" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
          <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
            <CalendarIcon size={24} />
          </div>
          جدول محاضراتي الأسبوعي
        </h1>
        <p className="text-slate-500 font-bold mt-2 mr-14">تلقائي: يتم تحديث الجدول بناءً على تكليفات شؤون الطلاب</p>
      </div>

      {/* الجدول الدراسي */}
      <div className="space-y-6">
        {days.map((day) => (
          <div key={day} className="group">
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-lg font-black text-slate-400 group-hover:text-blue-600 transition-colors">{day}</h2>
              <div className="h-[1px] flex-1 bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklySchedule[day] && weeklySchedule[day].length > 0 ? (
                weeklySchedule[day].map((session, index) => (
                  <div key={index} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex justify-between items-center group/card">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black group-hover/card:bg-blue-600 group-hover/card:text-white transition-all">
                        {session.subjectCode || session.subject.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-lg">{session.subject}</h4>
                        <div className="flex gap-4 mt-1">
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <Clock size={14} className="text-blue-500"/> {session.time}
                          </span>
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <MapPin size={14} className="text-red-400"/> {session.room || "قاعة غير محددة"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                       <span className="px-4 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover/card:bg-emerald-50 group-hover/card:text-emerald-600 transition-all">
                         محاضرة نشطة
                       </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-4 px-8 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200 flex items-center gap-3 text-slate-400 italic font-medium">
                  <AlertCircle size={18} /> لا يوجد محاضرات مجدولة لهذا اليوم
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorSchedule;