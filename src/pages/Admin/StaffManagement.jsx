import React, { useState } from 'react';
import { UserPlus, Edit2, Trash2, X } from 'lucide-react';

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
    // تعديل 1: إضافة الاتجاه وضبط الحواف الخارجية بالتناسب مع الموبايل والابتوب
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* Header */}
      {/* تعديل 2: كسر الهيدر ليكون عموداً في الموبايل وزر الإضافة يأخذ العرض الكامل لسهولة اللمس */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">إدارة هيئة التدريس</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">التحكم في بيانات الدكاترة والمعيدين</p>
        </div>
        <button 
          onClick={openAddModal}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <UserPlus size={20} /> إضافة عضو جديد
        </button>
      </div>

      {/* Table Section & Mobile Cards */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* تعديل 3: الجدول يظهر فقط في الشاشات الكبيرة والمتوسطة لحمايته من التشوّه */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[11px] font-black uppercase tracking-widest">
              <tr>
                <th className="p-5">الاسم</th>
                <th className="p-5">القسم</th>
                <th className="p-5">الرتبة</th>
                <th className="p-5">الحالة</th>
                <th className="p-5 text-left pl-8">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition group">
                  <td className="p-5 font-black text-slate-700">{member.name}</td>
                  <td className="p-5 text-sm font-bold text-slate-500">{member.dept}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${member.role === 'instructor' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                      {member.role === 'instructor' ? 'أستاذ دكتور' : 'معيد'}
                    </span>
                  </td>
                  <td className="p-5 text-emerald-500 font-black text-xs">{member.status}</td>
                  <td className="p-5 text-left pl-8">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition duration-200">
                      <button onClick={() => openEditModal(member)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit2 size={16}/></button>
                      <button onClick={() => handleDelete(member.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* تعديل 4: تحويل الأسطر إلى كروت مريحة وتفاعلية باللمس على الموبايل */}
        <div className="block md:hidden divide-y divide-slate-100">
          {staff.map((member) => (
            <div key={member.id} className="p-5 flex flex-col gap-3 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-slate-800 text-sm">{member.name}</h4>
                  <p className="text-slate-400 text-[11px] font-bold mt-0.5">{member.dept}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${member.role === 'instructor' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                  {member.role === 'instructor' ? 'أستاذ دكتور' : 'معيد'}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                <span className="text-emerald-500 font-black text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  {member.status}
                </span>
                <div className="flex gap-1 bg-slate-50 rounded-xl p-0.5">
                  <button onClick={() => openEditModal(member)} className="p-2 text-blue-600"><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(member.id)} className="p-2 text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal - نافذة الإضافة والتعديل */}
      {isModalOpen && (
        // تعديل 5: تحسين أبعاد وهيكل الـ Modal ليصبح متوافقاً مع الهواتف ولا يلتصق بالأطراف
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg sm:text-xl font-black text-slate-800 text-right">{editingMember ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-lg transition">
                <X size={20}/>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 sm:space-y-5 text-right">
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">الاسم بالكامل</label>
                <input 
                  required 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition font-bold text-sm text-right"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">القسم</label>
                <input 
                  required 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition font-bold text-sm text-right"
                  value={formData.dept}
                  onChange={(e) => setFormData({...formData, dept: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">الرتبة</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition font-bold text-sm cursor-pointer text-right"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="instructor">أستاذ دكتور</option>
                  <option value="ta">معيد</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3.5 sm:py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition text-sm sm:text-base">
                حفظ البيانات
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;