import React, { useState } from 'react';
import { Check, X, UserCheck, Search, Save, Calendar } from 'lucide-react';

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
    <div className="p-6 font-sans" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">تحضير الطلاب</h1>
          <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
            <Calendar size={16} className="text-blue-600"/> تاريخ اليوم: {new Date().toLocaleDateString('ar-EG')}
          </p>
        </div>
        <button className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition flex items-center gap-2">
          <Save size={20}/> حفظ الكشف
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest border-b">
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
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-700">{student.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold italic">ID: {student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => toggleStatus(student.id, 'present')}
                      className={`p-3 rounded-xl border-2 transition-all ${student.status === 'present' ? 'bg-emerald-500 border-emerald-500 text-white shadow-md scale-110' : 'border-slate-100 text-slate-300 hover:border-emerald-200'}`}
                    >
                      <Check size={20}/>
                    </button>
                    <button 
                      onClick={() => toggleStatus(student.id, 'absent')}
                      className={`p-3 rounded-xl border-2 transition-all ${student.status === 'absent' ? 'bg-red-500 border-red-500 text-white shadow-md scale-110' : 'border-slate-100 text-slate-300 hover:border-red-200'}`}
                    >
                      <X size={20}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;