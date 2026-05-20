import React, { useState } from 'react';
import { ClipboardCheck, Save, Search, User, FileText, Edit2, CheckCircle } from 'lucide-react';

const InstructorGrading = () => {
  // بيانات الطلاب في مادة معينة (مثلاً مادة الذكاء الاصطناعي)
  const [students, setStudents] = useState([
    { id: "2024001", name: "أحمد ياسين", attendance: 10, midterm: 15, final: 0, total: 25 },
    { id: "2024002", name: "ليلى محمود", attendance: 9, midterm: 18, final: 0, total: 27 },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  // دالة لتعديل درجات طالب معين
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

  return (
    <div className="p-6 font-sans" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">رصد درجات الطلاب</h1>
          <p className="text-slate-500 font-bold flex items-center gap-2 mt-1">
            <FileText size={16} className="text-blue-600"/> مادة: الذكاء الاصطناعي (CS401)
          </p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition shadow-lg ${
            isEditing ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {isEditing ? <><CheckCircle size={20} /> حفظ الدرجات النهائية</> : <><Edit2 size={20} /> تعديل الدرجات</>}
        </button>
      </div>

      {/* Grading Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="p-6">الطالب</th>
              <th className="p-6">الحضور (10)</th>
              <th className="p-6">الميدترم (20)</th>
              <th className="p-6">الفاينال (70)</th>
              <th className="p-6 font-black text-blue-600 italic">المجموع (100)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center font-bold text-xs italic">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 leading-none">{student.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">ID: {student.id}</p>
                    </div>
                  </div>
                </td>
                
                {/* خانات الدرجات */}
                <td className="p-6">
                  {isEditing ? (
                    <input type="number" className="w-20 bg-slate-50 border rounded-lg p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={student.attendance} onChange={(e) => updateGrade(student.id, 'attendance', e.target.value)} />
                  ) : (
                    <span className="font-bold text-slate-600">{student.attendance}</span>
                  )}
                </td>

                <td className="p-6">
                  {isEditing ? (
                    <input type="number" className="w-20 bg-slate-50 border rounded-lg p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={student.midterm} onChange={(e) => updateGrade(student.id, 'midterm', e.target.value)} />
                  ) : (
                    <span className="font-bold text-slate-600">{student.midterm}</span>
                  )}
                </td>

                <td className="p-6">
                  {isEditing ? (
                    <input type="number" className="w-20 bg-slate-50 border rounded-lg p-2 text-center font-black focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={student.final} onChange={(e) => updateGrade(student.id, 'final', e.target.value)} />
                  ) : (
                    <span className="font-bold text-slate-600">{student.final}</span>
                  )}
                </td>

                <td className="p-6 font-black text-blue-600 text-xl italic underline decoration-blue-200">
                  {student.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
        <p className="text-xs font-bold text-blue-700">تنبيه: لا يمكن تعديل درجات الفاينال بعد اعتمادها من شؤون الطلاب.</p>
      </div>
    </div>
  );
};

export default InstructorGrading;