import React, { useState, useEffect } from 'react';
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  IdCard, 
  Mail 
} from 'lucide-react';

const StudentDashboard = () => {
  // 1. حالات الـ State الديناميكية للسيستم بالكامل
  const [studentInfo, setStudentInfo] = useState(null);
  const [courses, setCourses] = useState([]);
  const [todayLectures, setTodayLectures] = useState([]);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. حساب المؤشرات والإحصائيات ديناميكياً (Computed States)
  const calculateStats = () => {
    if (courses.length === 0) {
      return { gpa: "0.00", status: "---", hours: 0, attendance: 0, warnings: 0 };
    }

    // أ. حساب الساعات المسجلة تلقائياً
    const totalHours = courses.reduce((sum, c) => sum + (Number(c.creditHours) || 0), 0);

    // ب. حساب متوسط نسبة الحضور العامة تلقائياً
    const avgAttendance = Math.round(courses.reduce((sum, c) => sum + (Number(c.attendance) || 0), 0) / courses.length);

    // ج. حساب عدد إنذارات الغياب (لو نسبة الحضور أقل من 75%)
    const warningsCount = courses.filter(c => (Number(c.attendance) || 0) < 75 || c.status === "إنذار غياب").length;

    // د. حساب تقريبي للـ GPA بناءً على درجات المواد
    const totalPoints = courses.reduce((sum, c) => {
      const grade = Number(c.totalGrade) || 0;
      if (grade >= 90) return sum + (4.0 * c.creditHours);
      if (grade >= 80) return sum + (3.0 * c.creditHours);
      if (grade >= 70) return sum + (2.0 * c.creditHours);
      if (grade >= 60) return sum + (1.0 * c.creditHours);
      return sum + 0;
    }, 0);
    
    const calculatedGpa = totalHours > 0 ? (totalPoints / totalHours).toFixed(2) : "0.00";

    // تحديد التقدير النصفي تلقائياً بناءً على الرقم المحسوب
    let gpaText = "مقبول";
    if (calculatedGpa >= 3.5) gpaText = "ممتاز مرتفع";
    else if (calculatedGpa >= 3.0) gpaText = "جيد جداً";
    else if (calculatedGpa >= 2.5) gpaText = "جيد";

    return {
      gpa: calculatedGpa,
      status: gpaText,
      hours: totalHours,
      attendance: avgAttendance,
      warnings: warningsCount
    };
  };

  useEffect(() => {
    // محاكاة جلب البيانات من السيرفر أو الـ LocalStorage (Fetch Simulation)
    const fetchDashboardData = () => {
      setIsLoading(true);

      // أ. جلب السيرفر لبيانات الطالب (أو كـ fallback من الحساب المفتوح)
      const localUser = localStorage.getItem('user');
      const userData = localUser ? JSON.parse(localUser) : {
        name: "إسلام عبد النبي",
        id: "UNI-2026-0942",
        faculty: "كلية الصيدلة",
        level: "الفرقة الأولى - الترم الثاني",
        email: "islam.abdelnaby@university.edu.eg"
      };
      setStudentInfo(userData);

      // ب. جلب مصفوفة المواد والدرجات (تخيل إنها جاية من الـ Database حالياً)
      // جرب غير في الأرقام دي هنا، وهتشوف الـ Cards والنسب فوق بتتغير لوحدها فوراً!
      const mockCourses = [
        { name: "كيمياء حيوية", code: "BC-101", creditHours: 3, totalGrade: 97, attendance: 92, status: "مستمرة" },
        { name: "فيزياء طبية", code: "MP-102", creditHours: 2, totalGrade: 83, attendance: 85, status: "مستمرة" },
        { name: "لغة إنجليزية مصطلحات", code: "EN-101", creditHours: 2, totalGrade: 95, attendance: 100, status: "منتهية" },
        { name: "رياضيات وإحصاء", code: "MS-103", creditHours: 3, totalGrade: 71, attendance: 73, status: "إنذار غياب" },
        { name: "برمجة الحاسب", code: "CS-105", creditHours: 3, totalGrade: 90, attendance: 95, status: "مستمرة" }
      ];
      setCourses(mockCourses);

      // ج. جلب محاضرات اليوم ديناميكياً
      const mockTodayLectures = [
        { name: "كيمياء حيوية", time: "08:00 ص - 10:00 ص", type: "محاضرة نظري", room: "مدرج أ", instructor: "د. أحمد رأفت" },
        { name: "فيزياء طبية", time: "10:00 ص - 12:00 م", type: "سكشن عملي", room: "معمل 1", instructor: "د. سارة ممدوح" }
      ];
      setTodayLectures(mockTodayLectures);

      // د. جلب سجل غيابات وحضور البصمة الأخيرة
      const mockAttendanceLog = [
        { date: "17 مايو 2026", day: "الأحد", course: "لغة إنجليزية مصطلحات", time: "09:15 ص", status: "حضور", type: "success" },
        { date: "16 مايو 2026", day: "السبت", course: "كيمياء حيوية", time: "08:05 ص", status: "تأخير مقبول", type: "warning" },
        { date: "16 مايو 2026", day: "السبت", course: "فيزياء طبية", time: "10:00 ص", status: "حضور", type: "success" },
        { date: "13 مايو 2026", day: "الأربعاء", course: "تدريب عملي عيادات", time: "---", status: "غياب بعذر", type: "info" }
      ];
      setAttendanceLog(mockAttendanceLog);

      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  // دالة مساعدة لتلوين شارات الحضور في الجدول تلقائياً
  const getBadgeStyle = (type) => {
    if (type === 'success') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (type === 'warning') return 'bg-amber-50 text-amber-600 border-amber-100';
    if (type === 'info') return 'bg-blue-50 text-blue-600 border-blue-100';
    return 'bg-rose-50 text-rose-600 border-rose-100';
  };

  // استدعاء دالة الحسابات لتجهيز الأرقام الحالية للفرونت إند
  const activeStats = calculateStats();

  // واجهة انتظار لحين قراءة الداتا (UX الاحترافي)
  if (isLoading || !studentInfo) {
    return (
      <div className="p-6 text-center font-sans text-slate-500 font-bold" dir="rtl">
        جاري تهيئة لوحة التحكم الديناميكية وقراءة البيانات...
      </div>
    );
  }

  return (
    <div className="p-6 font-sans space-y-8" dir="rtl">
      
      {/* 1. كارت الهوية الأكاديمي الرقمي (الديناميكي بالكامل) */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 z-10 relative">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white shadow-inner">
              <User size={40} className="stroke-[1.5]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black">{studentInfo.name}</h1>
                <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <IdCard size={11} /> طالب نشط
                </span>
              </div>
              <p className="text-blue-50/90 font-bold text-sm flex items-center gap-1.5">
                <GraduationCap size={16} className="text-teal-200" /> {studentInfo.faculty} | {studentInfo.level}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 lg:gap-6 text-xs font-bold text-blue-50/80 bg-black/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5 w-full lg:w-auto">
            <div className="space-y-1">
              <span className="text-[10px] block text-teal-200 font-black">الرقم الأكاديمي (ID)</span>
              <span className="font-mono text-white text-sm font-black">{studentInfo.id}</span>
            </div>
            <div className="w-[1px] bg-white/10 hidden sm:block"></div>
            <div className="space-y-1">
              <span className="text-[10px] block text-teal-200 font-black">البريد الإلكتروني الجامعي</span>
              <span className="flex items-center gap-1 text-white"><Mail size={12}/> {studentInfo.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. شبكة كروت الإحصائيات الأربعة المحسوبة ديناميكياً 100% */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* كارد GPA المحسوب */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">المعدل التراكمي GPA</span>
            <h3 className="text-2xl font-black text-slate-800 font-serif">{activeStats.gpa}</h3>
            <p className="text-[10px] font-bold text-emerald-600">{activeStats.status}</p>
          </div>
          <div className="p-3.5 rounded-2xl border bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:scale-110 duration-300">
            <Award size={22} />
          </div>
        </div>

        {/* كارد الساعات المحسوبة */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">الساعات المسجلة</span>
            <h3 className="text-2xl font-black text-slate-800 font-serif">{activeStats.hours} ساعة</h3>
            <p className="text-[10px] font-bold text-slate-400">{courses.length} مقررات دراسية</p>
          </div>
          <div className="p-3.5 rounded-2xl border bg-blue-50 text-blue-600 border-blue-100 group-hover:scale-110 duration-300">
            <BookOpen size={22} />
          </div>
        </div>

        {/* كارد متوسط الحضور */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">نسبة الحضور العامة</span>
            <h3 className="text-2xl font-black text-slate-800 font-serif">{activeStats.attendance}%</h3>
            <p className="text-[10px] font-bold text-teal-600">تحديث الحصص تلقائي</p>
          </div>
          <div className="p-3.5 rounded-2xl border bg-teal-50 text-teal-600 border-teal-100 group-hover:scale-110 duration-300">
            <CheckCircle2 size={22} />
          </div>
        </div>

        {/* كارد الإنذارات التلقائي */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all duration-300 group">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">إنذارات غياب نشطة</span>
            <h3 className={`text-2xl font-black font-serif ${activeStats.warnings > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
              {activeStats.warnings}
            </h3>
            <p className="text-[10px] font-bold text-slate-400">
              {activeStats.warnings > 0 ? 'تعديت نسبة الغياب المسموحة' : 'وضع آمن ومستقر'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border group-hover:scale-110 duration-300 ${activeStats.warnings > 0 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
            <AlertTriangle size={22} />
          </div>
        </div>

      </div>

      {/* 3. الأقسام السفلية المعتمدة بالكامل على الـ Loops */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* سجل الحضور الفعلي من مصفوفة الـ State */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/40">
              <h3 className="font-black text-base text-slate-800 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-teal-600" /> سجل الحضور والغياب الأخير
              </h3>
              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">قراءة من السيستم</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs font-bold">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 bg-slate-50/20">
                    <th className="p-4">التاريخ واليوم</th>
                    <th className="p-4">المقرر الدراسي</th>
                    <th className="p-4">وقت البصمة</th>
                    <th className="p-4 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {attendanceLog.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 text-slate-800">
                        <div>{log.date}</div>
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">{log.day}</div>
                      </td>
                      <td className="p-4 text-slate-700">{log.course}</td>
                      <td className="p-4 font-mono text-slate-500">{log.time}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-lg border text-[10px] font-black ${getBadgeStyle(log.type)}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* محاضرات اليوم الحالي معتمدة على الـ State */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 space-y-5">
            <h3 className="font-black text-base text-slate-800 flex items-center gap-2 border-b border-slate-50 pb-3">
              <Calendar size={18} className="text-blue-600" /> محاضراتك اليوم
            </h3>
            
            {todayLectures.length > 0 ? (
              <div className="space-y-4">
                {todayLectures.map((lec, idx) => (
                  <div key={idx} className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-3 hover:border-blue-200 transition-all group relative overflow-hidden border-r-4 border-r-blue-500">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{lec.name}</h4>
                      <span className="text-[9px] font-black px-2 py-0.5 bg-white border text-slate-400 rounded-md">{lec.type}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-bold">
                      <div className="flex items-center gap-1"><Clock size={12} className="text-teal-500"/> {lec.time}</div>
                      <div className="flex items-center gap-1"><MapPin size={12} className="text-emerald-500"/> {lec.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-300 font-bold text-xs space-y-2">
                <CheckCircle2 size={36} className="mx-auto text-slate-200" />
                <h4 className="text-slate-600 font-black">جدول اليوم فارغ!</h4>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;