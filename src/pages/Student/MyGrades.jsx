import React, { useState } from 'react';
import { Award, BookOpen, BarChart3, CheckCircle, ArrowUpRight, HelpCircle, GraduationCap, Percent } from 'lucide-react';

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
        return { bar: 'bg-emerald-500', text: 'text-emerald-600', badge: 'bg-emerald-50 border-emerald-100 text-emerald-700', dot: 'bg-emerald-500' };
      case 'good':
        return { bar: 'bg-blue-500', text: 'text-blue-600', badge: 'bg-blue-50 border-blue-100 text-blue-700', dot: 'bg-blue-500' };
      case 'average':
        return { bar: 'bg-amber-500', text: 'text-amber-600', badge: 'bg-amber-50 border-amber-100 text-amber-700', dot: 'bg-amber-500' };
      default:
        return { bar: 'bg-rose-500', text: 'text-rose-600', badge: 'bg-rose-50 border-rose-100 text-rose-700', dot: 'bg-rose-500' };
    }
  };

  return (
    <div className="p-6 font-sans space-y-8" dir="rtl">
      
      {/* 1. هيدر الصفحة بتصميم مميز ومتدرج */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Award size={32} /> السجل الأكاديمي والدرجات
          </h1>
          <p className="text-blue-50/80 font-bold mt-2 text-sm md:text-base">
            متابعة نتائج الامتحانات المعتمدة، كشف تقديرات المقررات، والمعدلات التراكمية للفصل الحالي.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 flex items-center gap-3">
          <CheckCircle size={20} className="text-teal-200" />
          <span className="font-black text-sm">حالة النتيجة: معتمدة رسمياً</span>
        </div>
      </div>

      {/* 2. كروت الإحصائيات الأكاديمية العلوية (المعدل والساعات) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* كارد المعدل GPA التراكمي */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">المعدل التراكمي الفصلي GPA</span>
            <h3 className="text-4xl font-black text-slate-800 font-serif">3.62 <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">ممتاز</span></h3>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><GraduationCap size={24} /></div>
        </div>

        {/* كارد الساعات المجتازة */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">الساعات المسجلة والمجتازة</span>
            <h3 className="text-4xl font-black text-slate-800 font-serif">{passedCredits} <span className="text-xs font-black text-slate-400">من أصل {totalCredits} س</span></h3>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><BookOpen size={24} /></div>
        </div>

        {/* كارد نسبة النجاح الإجمالية */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-teal-200 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">نسبة النجاح والاجتياز</span>
            <h3 className="text-4xl font-black text-slate-800 font-serif">100% <span className="text-xs font-black text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">مستقر</span></h3>
          </div>
          <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl"><Percent size={24} /></div>
        </div>
      </div>

      {/* عنوان قسم كروت النتائج */}
      <div className="flex justify-between items-center pt-2">
        <h3 className="font-black text-lg text-slate-800 flex items-center gap-2">
          <BarChart3 size={20} className="text-blue-600" /> تفاصيل درجات المقررات الدراسية
        </h3>
        <span className="text-xs font-bold text-slate-400">الترم الدراسي الأول</span>
      </div>

      {/* 3. شبكة عرض الدرجات بنظام الكروت الألترا مودرن */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesGrades.map((course, index) => {
          const theme = getGradeTheme(course.status);

          return (
            <div 
              key={index} 
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 space-y-5 hover:shadow-md hover:border-blue-200 transition-all duration-300 group relative overflow-hidden border-r-4 border-r-blue-500"
            >
              {/* هيدر الكارد: كود المادة والتقدير الرمزي الفخم */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black px-2.5 py-1 bg-slate-100 text-slate-500 rounded-xl">
                  {course.code} ({course.creditHours} س)
                </span>
                <span className={`text-sm font-black px-3.5 py-1 rounded-xl border tracking-wider ${theme.badge}`}>
                  {course.grade}
                </span>
              </div>

              {/* اسم المادة */}
              <div>
                <h4 className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                  {course.name}
                </h4>
              </div>

              {/* تفاصيل درجات الاختبارات المقسمة */}
              <div className="bg-slate-50/50 rounded-2xl p-4 space-y-2.5 border border-slate-100/50 text-xs font-bold text-slate-500">
                <div className="flex justify-between items-center">
                  <span>أعمال السنة والأنشطة</span>
                  <span className="text-slate-700 font-black">{course.assignments} <span className="text-slate-400 font-bold">/ 20</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span>الامتحان النصفي (Midterm)</span>
                  <span className="text-slate-700 font-black">{course.midterm} <span className="text-slate-400 font-bold">/ 30</span></span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200/50">
                  <span>الامتحان النهائي (Final)</span>
                  <span className="text-slate-700 font-black">{course.final} <span className="text-slate-400 font-bold">/ 50</span></span>
                </div>
              </div>

              {/* المجموع الكلي النهائي وشريط التقدم */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600 flex items-center gap-1">المجموع التراكمي للمادة</span>
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
      <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0"><HelpCircle size={20}/></div>
          <div>
            <h4 className="font-black text-sm text-slate-800">هل ترغب في مراجعة رصد درجات مادة معينة؟</h4>
            <p className="text-xs font-bold text-slate-400 mt-1">تتيح لك الكلية تقديم طلب مراجعة وتظلم إلكتروني لشؤون الطلاب، وسيتم إعادة فحص الورقة وإبلاغك بالرد.</p>
          </div>
        </div>
        <button className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 rounded-xl font-black text-xs border border-slate-200 shadow-sm transition active:scale-95 shrink-0 flex items-center gap-1 hover:text-blue-600">
          تقديم طلب تظلم <ArrowUpRight size={14} />
        </button>
      </div>

    </div>
  );
};

export default MyGrades;