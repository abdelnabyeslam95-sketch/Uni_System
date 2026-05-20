import React from 'react';
import { ShieldCheck, HelpCircle, FileText } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto border-t-2 border-slate-100 bg-white/85 backdrop-blur-md relative z-10 py-10 px-12" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 text-base font-black text-slate-500">
        
        {/* 1. الجزء الأيمن: الحقوق والبراند المعتمد للسيستم بحجم كبير */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 order-3 lg:order-1 text-center lg:text-right text-lg">
          <span className="font-mono text-slate-400 font-bold">© {currentYear}</span>
          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-black tracking-wider text-2xl">
            UNI-SYS
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-500 font-bold text-sm hidden sm:inline">منصة إدارة الخدمات الأكاديمية الموحدة</span>
        </div>

        {/* 2. الجزء الأوسط: رسالة النظام الرسمية والمكبرة */}
        <div className="flex items-center justify-center order-1 lg:order-2 bg-slate-100 border border-slate-200/80 px-8 py-3.5 rounded-2xl text-slate-700 shadow-sm text-sm font-black tracking-wide">
          النظام الموحد لتطوير الخدمات والعمليات التعليمية
        </div>

        {/* 3. الجزء الأيسر: روابط الدعم وحالة السيرفر بحجم وتوزيع فخم */}
        <div className="flex flex-wrap items-center justify-center gap-8 order-2 lg:order-3 text-sm">
          
          {/* مؤشر حالة النظام المباشر */}
          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-emerald-700 font-black text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>جميع الأنظمة تعمل بكفاءة</span>
          </div>

          <div className="h-5 w-[1px] bg-slate-300 hidden sm:block"></div>

          {/* الروابط السريعة */}
          <div className="flex gap-8 font-black text-slate-600">
            <a href="#help" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
              <HelpCircle size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span>مركز المساعدة الأكاديمي</span>
            </a>
            <a href="#terms" className="hover:text-blue-600 transition-colors flex items-center gap-2 group">
              <FileText size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span>الشروط وسياسة الخصوصية</span>
            </a>
          </div>

        </div>
        
      </div>
    </footer>
  );
};

export default Footer;