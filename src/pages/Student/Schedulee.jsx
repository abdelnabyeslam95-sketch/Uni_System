import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, GraduationCap, AlertCircle, BookOpen, Bell } from 'lucide-react';

const Schedulee = () => {
  // 1. بيانات الجدول الاحترافية مقسمة وموزعة بالوقت
  const daysData = {
    "السبت": [
      { id: 1, name: "كيمياء حيوية", time: "08:00 ص - 10:00 ص", type: "محاضرة نظري", room: "مدرج أ", instructor: "د. أحمد رأفت", color: "border-r-emerald-500 text-emerald-600 bg-emerald-50/40" },
      { id: 2, name: "فيزياء طبية", time: "10:00 ص - 12:00 م", type: "سكشن عملي", room: "معمل 1", instructor: "د. سارة ممدوح", color: "border-r-blue-500 text-blue-600 bg-blue-50/40" }
    ],
    "الأحد": [
      { id: 3, name: "لغة إنجليزية مصطلحات", time: "09:00 ص - 11:00 ص", type: "محاضرة نظري", room: "قاعة 4", instructor: "أ. منى زكي", color: "border-r-purple-500 text-purple-600 bg-purple-50/40" }
    ],
    "الإثنين": [
      { id: 4, name: "رياضيات وإحصاء", time: "12:00 م - 02:00 م", type: "محاضرة نظري", room: "مدرج ب", instructor: "د. محمد علي", color: "border-r-amber-500 text-amber-600 bg-amber-50/40" },
      { id: 5, name: "برمجة الحاسب", time: "02:00 م - 04:00 م", type: "سكشن عملي", room: "معمل الحاسب 3", instructor: "د. إسلام عبد النبي", color: "border-r-teal-500 text-teal-600 bg-teal-50/40" }
    ],
    "الثلاثاء": [
      { id: 6, name: "صيدلانيات ورعاية", time: "08:00 ص - 10:00 ص", type: "محاضرة نظري", room: "مدرج ج", instructor: "د. خالد الشريف", color: "border-r-indigo-500 text-indigo-600 bg-indigo-50/40" }
    ],
    "الأربعاء": [
      { id: 7, name: "تدريب عملي عيادات", time: "10:00 ص - 01:00 م", type: "تدريب ميداني", room: "المستشفى الجامعي", instructor: "أ.د. محمود نبيل", color: "border-r-rose-500 text-rose-600 bg-rose-50/40" }
    ],
    "الخميس": [],
    "الجمعة": []
  };

  // دالة لمعرفة اليوم الحالي باللغة العربية
  const getCurrentDayArabic = () => {
    const daysWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const today = daysWeek[new Date().getDay()];
    // لو اليوم الإجازة (الخميس أو الجمعة) يفتح افتراضياً على السبت
    return (today === "الخميس" || today === "الجمعة") ? "السبت" : today;
  };

  const [activeTab, setActiveTab] = useState(getCurrentDayArabic());
  const currentRealDay = getCurrentDayArabic();

  // جلب محاضرات اليوم المختار
  const currentLectures = daysData[activeTab] || [];

  return (
    <div className="p-6 font-sans space-y-8" dir="rtl">
      
      {/* 1. الهيدر العلوي المتناسق */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Calendar size={32} /> جدول المحاضرات الذكي
          </h1>
          <p className="text-blue-50/80 font-bold mt-2 text-sm md:text-base">
            عرض منظم زمنيّاً للمحاضرات والسكاشن الحالية وتوزيع القاعات الدراسية.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
          <GraduationCap size={20} className="text-teal-200" />
          <span className="font-black text-sm">مستوى الطالب: المستوى الأول</span>
        </div>
      </div>

      {/* 2. لوحة المؤشرات السريعة لليوم المختار */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400">محاضرات يوم ({activeTab})</span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{currentLectures.length} محاضرات</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BookOpen size={20}/></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400">حالة حضور اليوم</span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">منتظم</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><AlertCircle size={20}/></div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400">تنبيهات الأسبوع</span>
            <h3 className="text-2xl font-black text-amber-500 mt-1">1 تنبيه نشط</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><Bell size={20}/></div>
        </div>
      </div>

      {/* 3. شريط تبويبات الأيام (Day Tabs Layout) */}
      <div className="bg-slate-100/80 p-2 rounded-2xl flex flex-wrap gap-1 border border-slate-200/40">
        {Object.keys(daysData).map((day) => {
          if (day === "الخميس" || day === "الجمعة") return null; // إخفاء الإجازات الرسمية للترتيب
          const isSelected = activeTab === day;
          const isToday = currentRealDay === day;

          return (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`flex-1 min-w-[80px] py-3 text-sm font-black rounded-xl transition-all relative ${
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

      {/* 4. عرض المحاضرات بنظام التايم لاين الزمني (Timeline Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* عمود المحاضرات الرئيسي */}
        <div className="lg:col-span-3 space-y-4">
          {currentLectures.length > 0 ? (
            currentLectures.map((lec, idx) => (
              <div 
                key={lec.id} 
                className={`bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 border-r-8 ${lec.color} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group`}
              >
                {/* الجزء الأيمن: الوقت واسم المادة */}
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-white border border-slate-100 rounded-2xl shadow-inner text-slate-700 font-black text-center min-w-[70px] shrink-0">
                    <span className="text-[10px] block text-slate-400 font-bold mb-0.5">ترتيبها</span>
                    {idx + 1}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black px-2 py-0.5 bg-white/80 border rounded-md text-slate-500">{lec.type}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{lec.name}</h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <User size={13} className="text-slate-300" />
                      <span>المحاضر: {lec.instructor}</span>
                    </div>
                  </div>
                </div>

                {/* الجزء الأيسر: الوقت والمكان */}
                <div className="flex flex-col md:items-end gap-2 text-xs font-bold text-slate-500 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <Clock size={14} className="text-teal-500" />
                    <span className="text-slate-700 font-black">{lec.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 md:self-end">
                    <MapPin size={14} className="text-emerald-500" />
                    <span className="text-slate-800 font-black">{lec.room}</span>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-[2rem] border border-slate-100 p-12 text-center text-slate-400 space-y-2 shadow-sm">
              <Calendar size={48} className="mx-auto text-slate-200" />
              <h4 className="font-black text-base text-slate-600">لا يوجد محاضرات مجدولة</h4>
              <p className="text-xs font-bold">استمتع بيومك! لا توجد التزامات دراسية في هذا اليوم.</p>
            </div>
          )}
        </div>

        {/* كارد التنبيهات والملاحظات الجانبي الأنيق */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/30 p-6 rounded-[2rem] border border-amber-100 shadow-sm space-y-4">
            <h4 className="font-black text-amber-800 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> ملاحظات أكاديمية هامة
            </h4>
            <ul className="text-xs font-bold text-amber-900/80 space-y-3 list-disc list-inside leading-relaxed">
              <li>الالتزام بارتداء البالطو الأبيض (Lab Coat) شرط أساسي لدخول كافة سكاشن العملي بالمعامل.</li>
              <li>يرجى الحضور قبل موعد المحاضرة بـ 5 دقائق على الأكثر لتسجيل الحضور الإلكتروني.</li>
              <li>سكاشن الحاسب الآلي تقام هذا الأسبوع في معمل رقم 3 بالدور الثاني.</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Schedulee;