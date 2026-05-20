import React, { useState } from 'react';
import { GraduationCap, Plus, Edit3, Trash2, X, CheckCircle, Layers } from 'lucide-react';

const Faculties = () => {
  const [faculties, setFaculties] = useState([
    { id: 1, name: "كلية الهندسة", dean: "د. أحمد منصور", departments: ["حاسبات", "كهرباء", "ميكانيكا"] },
    { id: 2, name: "كلية الحاسبات والمعلومات", dean: "د. سارة الليثي", departments: ["الذكاء الاصطناعي", "علوم الحاسب"] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', dean: '', departments: '' });

  const handleOpenModal = (fac = null) => {
    if (fac) {
      setEditingId(fac.id);
      setFormData({ name: fac.name, dean: fac.dean, departments: fac.departments.join(', ') });
    } else {
      setEditingId(null);
      setFormData({ name: '', dean: '', departments: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const facultyData = {
      id: editingId || Date.now(),
      name: formData.name,
      dean: formData.dean,
      departments: formData.departments.split(',').map(d => d.trim()),
    };

    if (editingId) {
      setFaculties(faculties.map(f => f.id === editingId ? facultyData : f));
    } else {
      setFaculties([...faculties, facultyData]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذه الكلية نهائياً؟")) {
      setFaculties(faculties.filter(f => f.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الكليات</h1>
          <p className="text-slate-500 font-medium">إضافة وتعديل الهيكل التنظيمي للجامعة</p>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <Plus size={20} /> إضافة كلية
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculties.map((fac) => (
          <div key={fac.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="h-2 bg-blue-600"></div>
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><GraduationCap size={24} /></div>
                <div className="flex gap-1">
                  <button onClick={() => handleOpenModal(fac)} className="p-2 text-slate-400 hover:text-blue-600"><Edit3 size={16}/></button>
                  <button onClick={() => handleDelete(fac.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-1">{fac.name}</h3>
              <p className="text-sm text-slate-500 font-bold mb-4 flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> العميد: {fac.dean}</p>
              <div className="flex flex-wrap gap-2">
                {fac.departments.map((dept, i) => (
                  <span key={i} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold border border-slate-100">{dept}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black">{editingId ? 'تعديل كلية' : 'إضافة كلية جديدة'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <input required placeholder="اسم الكلية" className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input required placeholder="اسم العميد" className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold" value={formData.dean} onChange={(e) => setFormData({...formData, dean: e.target.value})} />
              <textarea required placeholder="الأقسام (افصل بفاصلة ,)" className="w-full bg-slate-50 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold h-24" value={formData.departments} onChange={(e) => setFormData({...formData, departments: e.target.value})} />
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg">حفظ البيانات</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculties;