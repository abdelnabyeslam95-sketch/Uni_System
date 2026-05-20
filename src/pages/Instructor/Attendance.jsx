import React, { useState } from 'react';
import { Check, X, Save, Calendar } from 'lucide-react';

const Attendance = () => {
  const [students, setStudents] = useState([
    { id: "2024001", name: "أحمد ياسين", status: null },
    { id: "2024002", name: "ليلى محمود", status: null },
    { id: "2024003", name: "عمر خالد", status: null },
  ]);

  const toggleStatus = (id, newStatus) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* Header */}
      {/* تعديل 1: تحسين مرونة الهيدر على الموبايل ليصبح عمودياً ومتناسقاً */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">تحضير الطلاب</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bold flex items-center gap-2 mt-1">
            <Calendar size={16} className="text-blue-600 shrink-0"/> تاريخ اليوم: {new Date().toLocaleDateString('ar-EG')}
          </p>
        </div>
        <button className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-sm sm:text-base">
          <Save size={20}/> حفظ الكشف
        </button>
      </div>

      {/* Container Layout */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* العرض للشاشات الكبيرة والمتوسطة (الجدول التقليدي المتجاوب) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="p-6">الطالب</th>
                <th className="p-6 text-center">الحالة (حاضر / غائب)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-700 text-sm sm:text-base">{student.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold italic mt-0.5">ID: {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-4">
                      <button 
                        onClick={() => toggleStatus(student.id, 'present')}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          student.status === 'present' 
                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-md scale-105' 
                            : 'border-slate-100 text-slate-300 hover:border-emerald-200 hover:text-emerald-500'
                        }`}
                      >
                        <Check size={18}/>
                      </button>
                      <button 
                        onClick={() => toggleStatus(student.id, 'absent')}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          student.status === 'absent' 
                            ? 'bg-red-500 border-red-500 text-white shadow-md scale-105' 
                            : 'border-slate-100 text-slate-300 hover:border-red-200 hover:text-red-500'
                        }`}
                      >
                        <X size={18}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* تعديل 2: واجهة مخصصة بالكامل للموبايل تعتمد على كروت تحضير سريعة وعريضة سهلة اللمس */}
        <div className="block md:hidden divide-y divide-slate-100">
          {students.map((student) => (
            <div key={student.id} className="p-5 flex items-center justify-between gap-4 bg-white">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm shrink-0">
                  {student.name.charAt(0)}
                </div>
                <div className="truncate">
                  <h4 className="font-black text-slate-800 text-sm truncate">{student.name}</h4>
                  <p className="text-slate-400 text-[11px] font-bold mt-0.5">ID: {student.id}</p>
                </div>
              </div>
              
              {/* أزرار التحضير للموبايل بمساحة أكبر للضغط */}
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => toggleStatus(student.id, 'present')}
                  className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all ${
                    student.status === 'present' 
                      ? 'bg-emerald-500 border-emerald-500 text-white shadow-md' 
                      : 'border-slate-100 text-slate-300 bg-slate-50/50'
                  }`}
                >
                  <Check size={18}/>
                </button>
                <button 
                  onClick={() => toggleStatus(student.id, 'absent')}
                  className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center transition-all ${
                    student.status === 'absent' 
                      ? 'bg-red-500 border-red-500 text-white shadow-md' 
                      : 'border-slate-100 text-slate-300 bg-slate-50/50'
                  }`}
                >
                  <X size={18}/>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Attendance;