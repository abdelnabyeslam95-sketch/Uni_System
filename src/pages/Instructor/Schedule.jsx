import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar as CalendarIcon, AlertCircle } from 'lucide-react';

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
        const allSchedules = JSON.parse(localStorage.getItem('university_schedules')) || [];
        
        // تصفية الجداول: جلب المواد التابعة للدكتور فقط
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
        // تأخير بسيط لمحاكاة استجابة السيرفر الحقيقية بشكل مريح للعين
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100 shrink-0">
          <CalendarIcon size={24} />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">جدول محاضراتي الأسبوعي</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bold mt-0.5">يتم تحديث المواعيد والقاعات تلقائياً بناءً على تكليفات شؤون الطلاب</p>
        </div>
      </div>

      {/* الجدول الدراسي الحقيقي أو واجهة التحميل (Skeleton) */}
      <div className="space-y-6">
        {days.map((day) => (
          <div key={day} className="group">
            {/* عنوان اليوم مع الخط الفاصل */}
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-sm sm:text-base font-black text-slate-400 group-hover:text-blue-600 transition-colors">{day}</h2>
              <div className="h-[1px] flex-1 bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {loading ? (
                /* واجهة الهيكل الوهمي أثناء التحميل لمنع القفز البصري للواجهة */
                <div className="col-span-1 bg-slate-50/50 h-24 rounded-[2rem] border border-slate-100 animate-pulse"></div>
              ) : weeklySchedule[day] && weeklySchedule[day].length > 0 ? (
                weeklySchedule[day].map((session, index) => (
                  <div key={index} className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex justify-between items-center group/card gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* اختصار اسم المادة محمي بالكامل لمنع الـ Break في حالة عدم وجود قيمة */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-sm sm:text-base group-hover/card:bg-blue-600 group-hover/card:text-white transition-all shrink-0">
                        {session.subjectCode || session.subject?.substring(0, 2).toUpperCase() || "CR"}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-800 text-sm sm:text-base truncate">{session.subject}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                            <Clock size={13} className="text-blue-500 shrink-0"/> {session.time}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                            <MapPin size={13} className="text-red-400 shrink-0"/> {session.room || "قاعة غير محددة"}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* شارة حالة المحاضرة: متجاوبة وتختفي في الشاشات الصغيرة جداً لتوفير مساحة للنص */}
                    <div className="hidden sm:block shrink-0">
                       <span className="px-3.5 py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover/card:bg-emerald-50 group-hover/card:text-emerald-600 transition-all">
                         محاضرة نشطة
                       </span>
                    </div>
                  </div>
                ))
              ) : (
                /* حالة خلو اليوم من المحاضرات */
                <div className="col-span-full py-4 px-5 bg-slate-50/40 rounded-[2rem] border border-dashed border-slate-200/80 flex items-center gap-2.5 text-slate-400 italic text-xs sm:text-sm font-bold">
                  <AlertCircle size={16} className="shrink-0 text-slate-300" /> لا يوجد محاضرات مجدولة لهذا اليوم
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