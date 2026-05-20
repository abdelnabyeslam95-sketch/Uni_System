import React, { useState } from 'react';
import { FileText, Edit2, CheckCircle, Search, Users, Award } from 'lucide-react';

const InstructorGrading = () => {
  // بيانات الطلاب في مادة معينة
  const [students, setStudents] = useState([
    { id: "2024001", name: "أحمد ياسين", attendance: 10, midterm: 15, final: 0, total: 25 },
    { id: "2024002", name: "ليلى محمود", attendance: 9, midterm: 18, final: 0, total: 27 },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // دالة لتعديل درجات طالب معين وحساب المجموع تلقائياً
  const updateGrade = (id, field, value) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        const updatedStudent = { ...s, [field]: parseFloat(value) || 0 };
        updatedStudent.total = updatedStudent.attendance + updatedStudent.midterm + updatedStudent.final;
        return updatedStudent;
      }
      return s;
    }));
  };

  // فلترة قائمة الطلاب ديناميكياً بناءً على البحث
  const filteredStudents = students.filter(student => 
    student.name.includes(searchTerm) || student.id.includes(searchTerm)
  );

  return (
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">رصد درجات الطلاب</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bold flex items-center gap-2 mt-1">
            <FileText size={16} className="text-blue-600 shrink-0"/> مادة: الذكاء الاصطناعي (CS401)
          </p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 transition duration-200 text-sm sm:text-base shadow-lg ${
            isEditing 
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100" 
              : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200"
          }`}
        >
          {isEditing ? <><CheckCircle size={20} /> حفظ الدرجات</> : <><Edit2 size={20} /> تعديل الدرجات</>}
        </button>
      </div>

      {/* شريط البحث */}
      <div className="relative mb-6">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          placeholder="ابحث عن الطالب بالاسم أو الرقم الجامعي للرصد السريع..."
          className="w-full bg-white border border-slate-200/80 rounded-2xl pr-11 pl-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right shadow-sm text-slate-700 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grading Container Layout */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        
        {filteredStudents.length > 0 ? (
          <>
            {/* العرض للشاشات الكبيرة والمتوسطة (الجدول التقليدي المتجاوب ومحمي الأبعاد) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-right whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="p-6">الطالب</th>
                    <th className="p-6">الحضور (10)</th>
                    <th className="p-6">الميدترم (20)</th>
                    <th className="p-6">الفاينال (70)</th>
                    <th className="p-6 font-black text-blue-600">المجموع (100)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center font-black text-xs">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-sm">{student.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-0.5">ID: {student.id}</p>
                          </div>
                        </div>
                      </td>
                      
                      {/* حضور */}
                      <td className="p-6">
                        {isEditing ? (
                          <input type="number" min="0" max="10" className="w-20 bg-slate-50 border border-slate-200 rounded-xl p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800" 
                          value={student.attendance} onChange={(e) => updateGrade(student.id, 'attendance', e.target.value)} />
                        ) : (
                          <span className="font-bold text-slate-600 text-sm">{student.attendance}</span>
                        )}
                      </td>

                      {/* ميدترم */}
                      <td className="p-6">
                        {isEditing ? (
                          <input type="number" min="0" max="20" className="w-20 bg-slate-50 border border-slate-200 rounded-xl p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800" 
                          value={student.midterm} onChange={(e) => updateGrade(student.id, 'midterm', e.target.value)} />
                        ) : (
                          <span className="font-bold text-slate-600 text-sm">{student.midterm}</span>
                        )}
                      </td>

                      {/* فاينال */}
                      <td className="p-6">
                        {isEditing ? (
                          <input type="number" min="0" max="70" className="w-20 bg-slate-50 border border-slate-200 rounded-xl p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none text-sm text-slate-800" 
                          value={student.final} onChange={(e) => updateGrade(student.id, 'final', e.target.value)} />
                        ) : (
                          <span className="font-bold text-slate-600 text-sm">{student.final}</span>
                        )}
                      </td>

                      {/* المجموع الإجمالي */}
                      <td className="p-6 font-black text-blue-600 text-base">
                        {student.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* العرض المخصص لشاشات الموبايل (كروت الرصد الذكية وسهلة اللمس) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <div key={student.id} className="p-5 bg-white flex flex-col gap-4">
                  {/* بيانات الطالب الأساسية داخل الكارت */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center font-black text-xs">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">{student.name}</h4>
                        <p className="text-slate-400 text-[10px] font-bold">ID: {student.id}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-black text-slate-400 uppercase block tracking-wider mb-0.5">المجموع</span>
                      <span className="text-base font-black text-blue-600 bg-blue-50/60 px-2.5 py-1 rounded-xl border border-blue-100/50">{student.total} / 100</span>
                    </div>
                  </div>

                  {/* خانات إدخال أو عرض الدرجات مقسمة بشكل مرن للموبايل */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                    <div className="flex flex-col items-center justify-center text-center">
                      <label className="text-[10px] font-bold text-slate-400 mb-1">حضور (10)</label>
                      {isEditing ? (
                        <input type="number" min="0" max="10" className="w-full bg-white border border-slate-200 rounded-xl p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none text-xs" 
                        value={student.attendance} onChange={(e) => updateGrade(student.id, 'attendance', e.target.value)} />
                      ) : (
                        <span className="font-black text-slate-700 text-sm py-1">{student.attendance}</span>
                      )}
                    </div>

                    <div className="flex flex-col items-center justify-center text-center border-x border-slate-200/60 px-1">
                      <label className="text-[10px] font-bold text-slate-400 mb-1">ميدترم (20)</label>
                      {isEditing ? (
                        <input type="number" min="0" max="20" className="w-full bg-white border border-slate-200 rounded-xl p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none text-xs" 
                        value={student.midterm} onChange={(e) => updateGrade(student.id, 'midterm', e.target.value)} />
                      ) : (
                        <span className="font-black text-slate-700 text-sm py-1">{student.midterm}</span>
                      )}
                    </div>

                    <div className="flex flex-col items-center justify-center text-center">
                      <label className="text-[10px] font-bold text-slate-400 mb-1">فاينال (70)</label>
                      {isEditing ? (
                        <input type="number" min="0" max="70" className="w-full bg-white border border-slate-200 rounded-xl p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none text-xs" 
                        value={student.final} onChange={(e) => updateGrade(student.id, 'final', e.target.value)} />
                      ) : (
                        <span className="font-black text-slate-700 text-sm py-1">{student.final}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* حالة عدم وجود نتائج للبحث */
          <div className="p-12 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
            <Users size={40} className="text-slate-300 stroke-[1.5]" />
            <p className="font-bold text-sm">لم يتم العثور على طلاب يطابقون بحثك.</p>
          </div>
        )}

      </div>

      {/* الملاحظة التنبيهية السفلية المتجاوبة */}
      <div className="mt-6 bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start sm:items-center gap-3">
        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mt-1.5 sm:mt-0 shrink-0"></div>
        <p className="text-xs font-bold text-amber-800 leading-normal">تنبيه نظامي: لا يمكن تعديل درجات الاختبارات النهائية بمجرد اعتماد الكشف وإرساله إلكترونياً لشؤون طلاب الكلية.</p>
      </div>
    </div>
  );
};

export default InstructorGrading;