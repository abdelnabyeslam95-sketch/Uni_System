import React, { useState } from 'react';
import { UserPlus, Search, Edit3, Trash2, X, CheckCircle2, Clock, UserCheck } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([
    { id: "2024001", name: "أحمد ياسين", faculty: "الهندسة", level: "المستوى الثالث", status: "منتظم", gpa: "3.8" },
    { id: "2024002", name: "ليلى محمود", faculty: "الحاسبات", level: "المستوى الأول", status: "مستجد", gpa: "3.9" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', faculty: '', level: '', status: 'منتظم', gpa: '' });

  const handleOpenModal = (student = null) => {
    if (student) {
      setEditingId(student.id);
      setFormData(student);
    } else {
      setEditingId(null);
      setFormData({ id: '', name: '', faculty: '', level: '', status: 'منتظم', gpa: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setStudents(students.map(s => s.id === editingId ? formData : s));
    } else {
      setStudents([...students, formData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذا الطالب؟")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">شؤون الطلاب</h1>
          <p className="text-slate-500 font-medium">إدارة قيد الطلاب وحالاتهم الأكاديمية</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <UserPlus size={20} /> تسجيل طالب
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest">
            <tr>
              <th className="p-6">الطالب</th>
              <th className="p-6">الكلية</th>
              <th className="p-6">المعدل</th>
              <th className="p-6">الحالة</th>
              <th className="p-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition">
                <td className="p-6 font-black text-slate-800">
                  {student.name} <br/> <span className="text-[10px] text-slate-400 font-bold">ID: {student.id}</span>
                </td>
                <td className="p-6 font-bold text-slate-600">{student.faculty} <br/> <span className="text-xs text-slate-400 font-medium">{student.level}</span></td>
                <td className="p-6 font-black text-blue-600">{student.gpa}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-xl text-[10px] font-black ${student.status === 'منتظم' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleOpenModal(student)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"><Edit3 size={18}/></button>
                    <button onClick={() => handleDelete(student.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
            <h2 className="text-xl font-black mb-6">{editingId ? 'تعديل طالب' : 'تسجيل طالب جديد'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input required placeholder="ID الطالب" className="w-full bg-slate-50 p-3 rounded-xl outline-none" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} disabled={editingId} />
              <input required placeholder="اسم الطالب" className="w-full bg-slate-50 p-3 rounded-xl outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input required placeholder="الكلية" className="w-full bg-slate-50 p-3 rounded-xl outline-none" value={formData.faculty} onChange={(e) => setFormData({...formData, faculty: e.target.value})} />
              <select className="w-full bg-slate-50 p-3 rounded-xl outline-none font-bold" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                <option value="منتظم">منتظم</option>
                <option value="مستجد">مستجد</option>
                <option value="خريج">خريج</option>
              </select>
              <input required placeholder="GPA" className="w-full bg-slate-50 p-3 rounded-xl outline-none" value={formData.gpa} onChange={(e) => setFormData({...formData, gpa: e.target.value})} />
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black">حفظ التغييرات</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;