import React, { useState } from 'react';
import { Award, BookOpen, BarChart3, CheckCircle, ArrowUpLeft, HelpCircle, GraduationCap, Percent } from 'lucide-react';

const MyGrades = () => {
  // 1. بيانات درجات الطالب التفصيلية والأكاديمية
  const [coursesGrades] = useState([
    { name: "كيمياء حيوية", code: "BC-101", creditHours: 3, assignments: 18, midterm: 27, final: 52, total: 97, grade: "A+", status: "excellent" },
    { name: "فيزياء طبية", code: "MP-102", creditHours: 2, assignments: 16, midterm: 22, final: 45, total: 83, grade: "B+", status: "good" },
    { name: "لغة إنجليزية مصطلحات", code: "EN-101", creditHours: 2, assignments: 19, midterm: 28, final: 48, total: 95, grade: "A+", status: "excellent" },
    { name: "رياضيات وإحصاء", code: "MS-103", creditHours: 3, assignments: 14, midterm: 19, final: 38, total: 71, grade: "C+", status: "average" },
    { name: "برمجة الحاسب", code: "CS-105", creditHours: 3, assignments: 20, midterm: 29, final: 41, total: 90, grade: "A", status: "excellent" }
  ]);

  // إحصائيات عامة للوحة التحكم للدرجات
  const totalCredits = coursesGrades.reduce((sum, c) => sum + c.creditHours, 0);
  const passedCredits = totalCredits; // بافتراض اجتياز الكل لتميز الدرجات

  // دالة لتوزيع ألوان التقديرات والبارات
  const getGradeTheme = (status) => {
    switch (status) {
      case 'excellent':
        return { 
          bar: 'bg-emerald-500', 
          text: 'text-emerald-600', 
          badge: 'bg-emerald-50 border-emerald-100 text-emerald-700', 
          border: 'border-r-emerald-500' 
        };
      case 'good':
        return { 
          bar: 'bg-blue-500', 
          text: 'text-blue-600', 
          badge: 'bg-blue-50 border-blue-100 text-blue-700', 
          border: 'border-r-blue-500' 
        };
      case 'average':
        return { 
          bar: 'bg-amber-500', 
          text: 'text-amber-600', 
          badge: 'bg-amber-50 border-amber-100 text-amber-700', 
          border: 'border-r-amber-500' 
        };
      default:
        return { 
          bar: 'bg-rose-500', 
          text: 'text-rose-600', 
          badge: 'bg-rose-50 border-rose-100 text-rose-700', 
          border: 'border-r-rose-500' 
        };
    }
  };

  return (
    <div className="p-4 sm:p-6 font-sans space-y-6 sm:space-y-8" dir="rtl">
      
      {/* 1. هيدر الصفحة بتصميم مميز ومتدرج */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] text-white shadow-xl shadow-blue-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-black flex items-center gap-2 sm:gap-3">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" /> السجل الأكاديمي والدرجات
          </h1>
          <p className="text-blue-50/80 font-bold mt-1.5 text-xs sm:text-base leading-relaxed">
            متابعة نتائج الامتحانات المعتمدة، كشف تقديرات المقررات، والمعدلات التراكمية للفصل الحالي.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/20 flex items-center gap-2 shrink-0">
          <CheckCircle size={18} className="text-teal-200" />
          <span className="font-black text-xs sm:text-sm">حالة النتيجة: معتمدة رسمياً</span>
        </div>
      </div>

      {/* 2. كروت الإحصائيات الأكاديمية العلوية - متجاوبة بالكامل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* كارد المعدل GPA التراكمي */}
        <div className="bg-white p-5 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 block">المعدل التراكمي الفصلي GPA</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-serif flex items-baseline gap-2">
              3.62 
              <span className="text-[10px] sm:text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-sans">ممتاز</span>
            </h3>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl sm:rounded-2xl shrink-0"><GraduationCap size={22} /></div>
        </div>

        {/* كارد الساعات المجتازة */}
        <div className="bg-white p-5 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 block">الساعات المسجلة والمجتازة</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-serif flex items-baseline gap-1">
              {passedCredits} 
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 font-sans">من أصل {totalCredits} ساعة</span>
            </h3>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl shrink-0"><BookOpen size={22} /></div>
        </div>

        {/* كارد نسبة النجاح الإجمالية */}
        <div className="bg-white p-5 sm:p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-200 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 block">نسبة النجاح والاجتياز</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-serif flex items-baseline gap-2">
              100% 
              <span className="text-[10px] sm:text-xs font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md font-sans">مستقر</span>
            </h3>
          </div>
          <div className="p-3.5 bg-teal-50 text-teal-600 rounded-xl sm:rounded-2xl shrink-0"><Percent size={22} /></div>
        </div>
      </div>

      {/* عنوان قسم كروت النتائج */}
      <div className="flex justify-between items-center pt-2">
        <h3 className="font-black text-base sm:text-lg text-slate-800 flex items-center gap-2">
          <BarChart3 size={20} className="text-blue-600 shrink-0" /> تفاصيل درجات المقررات الدراسية
        </h3>
        <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">الترم الدراسي الأول</span>
      </div>

      {/* 3. شبكة عرض الدرجات بنظام الكروت الألترا مودرن */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {coursesGrades.map((course, index) => {
          const theme = getGradeTheme(course.status);

          return (
            <div 
              key={index} 
              className={`bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4 hover:shadow-xl hover:border-slate-200/80 hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden border-r-4 ${theme.border}`}
            >
              {/* هيدر الكارد: كود المادة والتقدير الرمزي الفخم */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-xl">
                  {course.code} ({course.creditHours} س)
                </span>
                <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-xl border tracking-wider ${theme.badge}`}>
                  {course.grade}
                </span>
              </div>

              {/* اسم المادة */}
              <div>
                <h4 className="font-black text-slate-800 text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                  {course.name}
                </h4>
              </div>

              {/* تفاصيل درجات الاختبارات المقسمة */}
              <div className="bg-slate-50/50 rounded-xl sm:rounded-2xl p-4 space-y-2.5 border border-slate-100/50 text-xs font-bold text-slate-500">
                <div className="flex justify-between items-center">
                  <span>أعمال السنة والأنشطة</span>
                  <span className="text-slate-700 font-black">{course.assignments} <span className="text-slate-400 font-medium">/ 20</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span>الامتحان النصفي (Midterm)</span>
                  <span className="text-slate-700 font-black">{course.midterm} <span className="text-slate-400 font-medium">/ 30</span></span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                  <span>الامتحان النهائي (Final)</span>
                  <span className="text-slate-700 font-black">{course.final} <span className="text-slate-400 font-medium">/ 50</span></span>
                </div>
              </div>

              {/* المجموع الكلي النهائي وشريط التقدم */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500 font-bold">المجموع الكلي للمادة</span>
                  <span className={`font-black text-sm ${theme.text}`}>{course.total} <span className="text-slate-400 text-xs font-bold">/ 100</span></span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${theme.bar}`} style={{ width: `${course.total}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. صندوق الإرشادات وتقديم طلبات المراجعة التفاعلي */}
      <div className="p-5 sm:p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-1 sm:mt-0"><HelpCircle size={20}/></div>
          <div>
            <h4 className="font-black text-sm text-slate-800">هل ترغب في مراجعة رصد درجات مادة معينة؟</h4>
            <p className="text-xs font-bold text-slate-400 mt-1 leading-relaxed">تتيح الكلية تقديم طلب مراجعة وتظلم إلكتروني لشؤون الطلاب، وسيتم إعادة فحص كراسة الإجابة وإبلاغك بالنتيجة فوراً.</p>
          </div>
        </div>
        {/* تعديل 2: تغيير السهم ليناسب التوجيه العربي جهة اليسار */}
        <button className="w-full lg:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 rounded-xl font-black text-xs border border-slate-200 shadow-sm transition active:scale-95 shrink-0 flex items-center justify-center gap-1 hover:text-blue-600">
          تقديم طلب تظلم <ArrowUpLeft size={14} />
        </button>
      </div>

    </div>
  );
};

export default MyGrades;