import React, { useState } from 'react';
import { UserPlus, Search, Edit2, Trash2, X, Check } from 'lucide-react';

const StaffManagement = () => {
  // 1. الحالة الأساسية للبيانات (داتا تجريبية)
  const [staff, setStaff] = useState([
    { id: 1, name: "د. إسلام عبد النبي", dept: "هندسة الحاسبات", role: "instructor", status: "نشط" },
    { id: 2, name: "م. أحمد علي", dept: "الذكاء الاصطناعي", role: "ta", status: "نشط" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: '', dept: '', role: 'instructor' });

  // 2. دالة فتح مودال الإضافة
  const openAddModal = () => {
    setEditingMember(null);
    setFormData({ name: '', dept: '', role: 'instructor' });
    setIsModalOpen(true);
  };

  // 3. دالة فتح مودال التعديل
  const openEditModal = (member) => {
    setEditingMember(member);
    setFormData({ name: member.name, dept: member.dept, role: member.role });
    setIsModalOpen(true);
  };

  // 4. دالة الحفظ (إضافة أو تعديل)
  const handleSave = (e) => {
    e.preventDefault();
    if (editingMember) {
      setStaff(staff.map(s => s.id === editingMember.id ? { ...s, ...formData } : s));
    } else {
      setStaff([...staff, { id: Date.now(), ...formData, status: "نشط" }]);
    }
    setIsModalOpen(false);
  };

  // 5. دالة الحذف
  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العضو؟")) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة هيئة التدريس</h1>
          <p className="text-slate-500 text-sm font-medium">التحكم في بيانات الدكاترة والمعيدين</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <UserPlus size={20} /> إضافة عضو جديد
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm font-black">
            <tr>
              <th className="p-5">الاسم</th>
              <th className="p-5">القسم</th>
              <th className="p-5">الرتبة</th>
              <th className="p-5">الحالة</th>
              <th className="p-5 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/50 transition">
                <td className="p-5 font-bold text-slate-700">{member.name}</td>
                <td className="p-5 text-slate-600">{member.dept}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${member.role === 'instructor' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {member.role === 'instructor' ? 'أستاذ دكتور' : 'معيد'}
                  </span>
                </td>
                <td className="p-5 text-emerald-500 font-bold text-xs">{member.status}</td>
                <td className="p-5">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => openEditModal(member)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit2 size={18}/></button>
                    <button onClick={() => handleDelete(member.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - نافذة الإضافة والتعديل */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-slate-800">{editingMember ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X/></button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">الاسم بالكامل</label>
                  <input 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition font-bold"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">القسم</label>
                  <input 
                    required 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition font-bold"
                    value={formData.dept}
                    onChange={(e) => setFormData({...formData, dept: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">الرتبة</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition font-bold"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="instructor">أستاذ دكتور</option>
                    <option value="ta">معيد</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95">
                  حفظ البيانات
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;