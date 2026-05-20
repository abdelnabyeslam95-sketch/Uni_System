import React, { useState } from 'react';
import { GraduationCap, Plus, Edit3, Trash2, X, CheckCircle } from 'lucide-react';

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
    // تعديل 1: جعل الـ padding مرن وخارجي متجاوب (p-4 sm:p-6)
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* Header */}
      {/* تعديل 2: تطبيق قاعدة رأس الصفحة (flex-col لـ sm:flex-row) والزرار يأخذ w-full في الموبايل */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">إدارة الكليات</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">إضافة وتعديل الهيكل التنظيمي للجامعة</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <Plus size={20} /> إضافة كلية
        </button>
      </div>

      {/* Grid الكروت */}
      {/* تعديل 3: توزيع الكروت بالتدريج (1 في الموبايل، 2 في التابلت md، و 3 في الشاشات الكبيرة lg فما فوق) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {faculties.map((fac) => (
          <div key={fac.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="h-2 bg-blue-600"></div>
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex gap-1 bg-slate-50 sm:bg-transparent rounded-xl p-0.5">
                    <button onClick={() => handleOpenModal(fac)} className="p-2 text-slate-400 hover:text-blue-600 transition"><Edit3 size={16}/></button>
                    <button onClick={() => handleDelete(fac.id)} className="p-2 text-slate-400 hover:text-red-500 transition"><Trash2 size={16}/></button>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-1 leading-tight">{fac.name}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0"/> العميد: {fac.dean}
                </p>
                
                {/* Tags الأقسام */}
                <div className="flex flex-wrap gap-1.5">
                  {fac.departments.map((dept, i) => (
                    <span key={i} className="bg-slate-50 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-100/60">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - نافذة الإضافة والتعديل */}
      {isModalOpen && (
        // تعديل 4: إضافة p-4 للخلفية لضمان عدم التصاق الكارت بالأطراف، وجعل الـ padding الداخلي مرن
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg sm:text-xl font-black text-slate-800">{editingId ? 'تعديل كلية' : 'إضافة كلية جديدة'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-lg transition"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4 text-right">
              <div>
                <input required placeholder="اسم الكلية" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <input required placeholder="اسم العميد" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" value={formData.dean} onChange={(e) => setFormData({...formData, dean: e.target.value})} />
              </div>
              <div>
                <textarea required placeholder="الأقسام (افصل بفاصلة ,)" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold h-24 text-sm text-right resize-none" value={formData.departments} onChange={(e) => setFormData({...formData, departments: e.target.value})} />
              </div>
              <button className="w-full bg-blue-600 text-white py-3.5 sm:py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition text-sm sm:text-base">
                حفظ البيانات
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculties;