import React from 'react';
import { Users, GraduationCap, BookOpen, Wallet, ArrowUpRight, Clock } from 'lucide-react';

const AdminDashboard = () => {
  // داتا تجريبية سريعة للإحصائيات
  const stats = [
    { title: "إجمالي الطلاب", value: "1,250", icon: <Users size={24}/>, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "أعضاء هيئة التدريس", value: "85", icon: <GraduationCap size={24}/>, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "المقررات النشطة", value: "42", icon: <BookOpen size={24}/>, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "المحصلات المالية", value: "450k", icon: <Wallet size={24}/>, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    // تعديل 1: تقليص الـ Padding على الموبايل (p-4) وتكبيره على الشاشات الأعلى (sm:p-6)
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* Header */}
      {/* تعديل 2: توسيط النص في الموبايل ليكون مريحاً للعين، ومحاذاة لليمين من أول الـ sm */}
      <div className="mb-8 text-center sm:text-right">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-800">نظرة عامة على الجامعة</h1>
        <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">مرحباً بك مجدداً، إليك ملخص أداء المنظومة اليوم</p>
      </div>

      {/* Stats Grid */}
      {/* تعديل 3: توزيع ديناميكي ذكي (عمود للموبايل، عمودين للتابلت md، و4 أعمدة للشاشات الكبيرة lg) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3.5 sm:p-4 ${stat.bg} ${stat.color} rounded-2xl transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
              <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1">
                <ArrowUpRight size={12}/> +5%
              </span>
            </div>
            <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest">{stat.title}</h3>
            <p className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* الأقسام السفلية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* النشاطات الأخيرة */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 p-5 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-lg sm:text-xl text-slate-800">آخر التحركات في السيستم</h3>
            <button className="text-blue-600 font-black text-xs hover:underline">عرض الكل</button>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((_, i) => (
              // تعديل 4: قلب عنصر القائمة ليكون عمودياً flex-col في الموبايل الصغير لتفادي انحشار كود السجل والوقت
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50 gap-3 sm:gap-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 font-black shrink-0">
                    {i === 0 ? "ST" : i === 1 ? "FI" : "SC"}
                  </div>
                  <div>
                    <p className="font-black text-slate-700 text-xs sm:text-sm leading-tight">
                      {i === 0 ? "تسجيل طالب جديد: أحمد علي" : i === 1 ? "تحصيل مصروفات: ليلى محمود" : "تعديل جدول مادة الحاسب"}
                    </p>
                    <span className="text-[10px] text-slate-400 font-bold italic flex items-center gap-1 mt-1">
                      <Clock size={10}/> منذ 10 دقائق
                    </span>
                  </div>
                </div>
                {/* كود التتبع يأخذ محاذاة يسار في الشاشات العادية، ويمين أسفل في الموبايل */}
                <span className="text-xs font-black text-slate-400 text-left sm:text-right self-end sm:self-auto">#0042{i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* توزيع الكليات السريع */}
        <div className="bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 text-white flex flex-col justify-between">
          <div>
            <h3 className="font-black text-lg sm:text-xl mb-6 text-center sm:text-right">توزيع الطلاب</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-black mb-2 uppercase tracking-widest text-slate-400">
                  <span>كلية الهندسة</span>
                  <span>70%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[70%] transition-all duration-1000"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-black mb-2 uppercase tracking-widest text-slate-400">
                  <span>كلية الحاسبات</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[45%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* كارت توصية الذكاء الاصطناعي */}
          <div className="mt-8 lg:mt-10 p-5 sm:p-6 bg-white/5 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 text-center">
             <p className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-wider">توصية الذكاء الاصطناعي</p>
             <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-200">تحتاج كلية الحاسبات إلى زيادة في عدد القاعات الدراسية بنسبة 20%</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;