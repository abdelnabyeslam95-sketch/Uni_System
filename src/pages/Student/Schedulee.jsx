import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, GraduationCap, AlertCircle, BookOpen, Bell } from 'lucide-react';

const StudentSchedule = () => {
  // 1. بيانات الجدول الاحترافية مقسمة وموزعة بالوقت واللون التفاعلي
  const [daysData] = useState({
    "السبت": [
      { id: 1, name: "كيمياء حيوية", time: "08:00 ص - 10:00 ص", type: "محاضرة نظري", room: "مدرج أ", instructor: "د. أحمد رأفت", color: "border-r-emerald-500 text-emerald-700 bg-emerald-50/40" },
      { id: 2, name: "فيزياء طبية", time: "10:00 ص - 12:00 م", type: "سكشن عملي", room: "معمل 1", instructor: "د. سارة ممدوح", color: "border-r-blue-500 text-blue-700 bg-blue-50/40" }
    ],
    "الأحد": [
      { id: 3, name: "لغة إنجليزية مصطلحات", time: "09:00 ص - 11:00 ص", type: "محاضرة نظري", room: "قاعة 4", instructor: "أ. منى زكي", color: "border-r-purple-500 text-purple-700 bg-purple-50/40" }
    ],
    "الإثنين": [
      { id: 4, name: "رياضيات وإحصاء", time: "12:00 م - 02:00 م", type: "محاضرة نظري", room: "مدرج ب", instructor: "د. محمد علي", color: "border-r-amber-500 text-amber-700 bg-amber-50/40" },
      { id: 5, name: "برمجة الحاسب", time: "02:00 م - 04:00 م", type: "سكشن عملي", room: "معمل الحاسب 3", instructor: "د. إسلام عبد النبي", color: "border-r-teal-500 text-teal-700 bg-teal-50/40" }
    ],
    "الثلاثاء": [
      { id: 6, name: "صيدلانيات ورعاية", time: "08:00 ص - 10:00 ص", type: "محاضرة نظري", room: "مدرج ج", instructor: "د. خالد الشريف", color: "border-r-indigo-500 text-indigo-700 bg-indigo-50/40" }
    ],
    "الأربعاء": [
      { id: 7, name: "تدريب عملي عيادات", time: "10:00 ص - 01:00 م", type: "تدريب ميداني", room: "المستشفى الجامعي", instructor: "أ.د. محمود نبيل", color: "border-r-rose-500 text-rose-700 bg-rose-50/40" }
    ],
    "الخميس": [],
    "الجمعة": []
  });

  // دالة مطورة ومؤمنة لمعرفة اليوم الحالي باللغة العربية
  const getCurrentDayArabic = () => {
    const daysWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const today = daysWeek[new Date().getDay()];
    // لو اليوم إجازة نهاية الأسبوع الرسمية، يفتح افتراضيّاً على جدول يوم السبت بداية الأسبوع
    return (today === "الخميس" || today === "الجمعة") ? "السبت" : today;
  };

  const currentRealDay = getCurrentDayArabic();
  const [activeTab, setActiveTab] = useState(currentRealDay);

  // جلب محاضرات اليوم المختار
  const currentLectures = daysData[activeTab] || [];

  return (
    <div className="p-4 sm:p-6 font-sans space-y-6 sm:space-y-8" dir="rtl">
      
      {/* 1. الهيدر العلوي المتناسق بتدرج الألوان المعتمد */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-white shadow-xl shadow-blue-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-black flex items-center gap-2 sm:gap-3">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" /> جدول المحاضرات الذكي
          </h1>
          <p className="text-blue-50/80 font-bold mt-1.5 text-xs sm:text-base leading-relaxed">
            عرض منظم زمنيّاً للمحاضرات والسكاشن الحالية وتوزيع القاعات الدراسية والعملية.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/20 flex items-center gap-2 shrink-0">
          <GraduationCap size={18} className="text-teal-200" />
          <span className="font-black text-xs sm:text-sm">مستوى الطالب: المستوى الأول</span>
        </div>
      </div>

      {/* 2. لوحة المؤشرات السريعة لليوم المختار - متجاوبة بالكامل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all duration-300">
          <div className="space-y-0.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 block">محاضرات يوم ({activeTab})</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">{currentLectures.length} محاضرات المادة</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl shrink-0"><BookOpen size={20}/></div>
        </div>

        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
          <div className="space-y-0.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 block">حالة حضور اليوم</span>
            <h3 className="text-xl sm:text-2xl font-black text-emerald-600">منتظم ومستقر</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl sm:rounded-2xl shrink-0"><AlertCircle size={20}/></div>
        </div>

        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-amber-200 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="space-y-0.5">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 block">تنبيهات الأسبوع</span>
            <h3 className="text-xl sm:text-2xl font-black text-amber-500">1 تنبيه نشط</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl sm:rounded-2xl shrink-0"><Bell size={20}/></div>
        </div>
      </div>

      {/* 3. شريط تبويبات الأيام - يدعم التمرير الأفقي السلس على الهواتف دون اقتطاع */}
      <div className="bg-slate-100/70 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200/40 overflow-x-auto no-scrollbar mask-gradient">
        {Object.keys(daysData).map((day) => {
          if (day === "الخميس" || day === "الجمعة") return null; // إخفاء الإجازات الرسمية لجمالية التصميم
          const isSelected = activeTab === day;
          const isToday = currentRealDay === day;

          return (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`flex-1 min-w-[90px] sm:min-w-0 py-2.5 sm:py-3 text-xs sm:text-sm font-black rounded-xl transition-all whitespace-nowrap shrink-0 relative ${
                isSelected 
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200/50 scale-[1.01]" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                {day}
                {isToday && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* 4. عرض المحاضرات بنظام التايم لاين والبطاقات الإرشادية */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        
        {/* عمود المحاضرات الرئيسي */}
        <div className="lg:col-span-3 space-y-4">
          {currentLectures.length > 0 ? (
            currentLectures.map((lec, idx) => (
              <div 
                key={lec.id} 
                className={`bg-white p-5 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 border-r-8 ${lec.color} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group`}
              >
                {/* الجزء الأيمن: الترتيب، النوع، واسم المادة */}
                <div className="flex items-center sm:items-start gap-4 min-w-0 w-full md:w-auto">
                  <div className="p-2 sm:p-3 bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl shadow-inner text-slate-700 font-black text-center min-w-[55px] sm:min-w-[65px] shrink-0">
                    <span className="text-[9px] block text-slate-400 font-bold mb-0.5">الترتيب</span>
                    <span className="text-sm sm:text-base font-black">{idx + 1}</span>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black px-2 py-0.5 bg-white/90 border rounded-md text-slate-500 shadow-sm shrink-0">{lec.type}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors truncate">{lec.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <User size={13} className="text-slate-300 shrink-0" />
                      <span className="truncate">{lec.instructor}</span>
                    </div>
                  </div>
                </div>

                {/* الجزء الأيسر: الوقت والمكان المعتمد بقوالب متجاوبة */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 text-[11px] sm:text-xs font-bold text-slate-500 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100/70 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shrink-0">
                    <Clock size={13} className="text-teal-500 shrink-0" />
                    <span className="text-slate-700 font-black">{lec.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shrink-0 md:self-end">
                    <MapPin size={13} className="text-emerald-500 shrink-0" />
                    <span className="text-slate-800 font-black">{lec.room}</span>
                  </div>
                </div>

              </div>
            ))
          ) : (
            /* حالة خلو اليوم الحالي من المحاضرات والسكاشن */
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 sm:p-12 text-center text-slate-400 space-y-2 shadow-sm border-dashed">
              <Calendar size={40} className="mx-auto text-slate-200" />
              <h4 className="font-black text-sm sm:text-base text-slate-600">لا يوجد محاضرات مجدولة اليوم</h4>
              <p className="text-[11px] sm:text-xs font-bold max-w-xs mx-auto text-slate-400/80">استمتع بيومك الأكاديمي! لا توجد التزامات مجدولة مسجلة في هذا اليوم.</p>
            </div>
          )}
        </div>

        {/* كارد التنبيهات والملاحظات الجانبي الأنيق */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/20 p-5 sm:p-6 rounded-[2rem] border border-amber-100/70 shadow-sm space-y-4">
            <h4 className="font-black text-amber-800 text-xs sm:text-sm flex items-center gap-2 shrink-0">
              <AlertCircle size={15} className="text-amber-600 shrink-0" /> ملاحظات أكاديمية هامة
            </h4>
            <ul className="text-[11px] sm:text-xs font-bold text-amber-900/80 space-y-3 list-disc pr-4 leading-relaxed">
              <li>الالتزام بارتداء البالطو الأبيض (Lab Coat) شرط أساسي لدخول كافة سكاشن العملي بالمعامل الحيوية والطبية.</li>
              <li>يرجى الحضور قبل موعد بدء المحاضرة بـ 5 دقائق لتسجيل الحضور الإلكتروني عبر السيستم بنجاح.</li>
              <li>سكاشن الحاسب الآلي والبرمجة تقام هذا الأسبوع في معمل رقم 3 المطور بالدور الثاني.</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};

export default StudentSchedule;