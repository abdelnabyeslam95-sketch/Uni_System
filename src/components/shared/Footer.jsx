import React from 'react';
import { HelpCircle, FileText } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    // تعديل 1: تقليل الـ padding في الموبايل (py-6 px-4) وزيادته في الشاشات الكبيرة (md:py-10 md:px-12) عشان العناصر متخنقش الشاشة
    <footer className="mt-auto border-t-2 border-slate-100 bg-white/85 backdrop-blur-md relative z-10 py-6 px-4 md:py-10 md:px-12" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8 text-base font-black text-slate-500">
        
        {/* 1. الجزء الأيمن: الحقوق والبراند */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 order-3 lg:order-1 text-center lg:text-right text-base md:text-lg w-full lg:w-auto">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400 font-bold">© {currentYear}</span>
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-black tracking-wider text-xl md:text-2xl">
              UNI-SYS
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-500 font-bold text-xs md:text-sm">منصة إدارة الخدمات الأكاديمية الموحدة</span>
        </div>

        {/* 2. الجزء الأوسط: رسالة النظام الرسمية */}
        {/* تعديل 2: جعل العرض w-full على الموبايل لتأخذ شكل كارت منسق، و lg:w-auto في الشاشات الكبيرة مع ضبط الهوامش الداخلية */}
        <div className="w-full sm:w-auto text-center flex items-center justify-center order-1 lg:order-2 bg-slate-100 border border-slate-200/80 px-4 sm:px-8 py-3 rounded-2xl text-slate-700 shadow-sm text-xs md:text-sm font-black tracking-wide">
          النظام الموحد لتطوير الخدمات والعمليات التعليمية
        </div>

        {/* 3. الجزء الأيسر: روابط الدعم وحالة السيرفر */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 order-2 lg:order-3 text-sm w-full lg:w-auto">
          
          {/* مؤشر حالة النظام */}
          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-emerald-700 font-black text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>جميع الأنظمة تعمل بكفاءة</span>
          </div>

          <div className="h-5 w-[1px] bg-slate-300 hidden sm:block"></div>

          {/* الروابط السريعة */}
          {/* تعديل 3: جعل الروابط تترتب تحت بعضها في الشاشات الصغيرة جداً (flex-col) وجنب بعضها من أول الـ sm لضمان عدم خروجها عن حدود الشاشة */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-black text-slate-600 text-center">
            <a href="#help" className="hover:text-blue-600 transition-colors flex items-center justify-center gap-2 group">
              <HelpCircle size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span>مركز المساعدة الأكاديمي</span>
            </a>
            <a href="#terms" className="hover:text-blue-600 transition-colors flex items-center justify-center gap-2 group">
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