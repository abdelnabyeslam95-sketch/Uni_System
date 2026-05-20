import React, { useState } from 'react';
import { UserPlus, Edit3, Trash2, X } from 'lucide-react';

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
    // تعديل 1: إضافة الحواف المرنة وتحديد الاتجاه العام من اليمين لليسار
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* Header */}
      {/* تعديل 2: جعل الهيدر مرناً بالكامل وزر التسجيل يأخذ العرض الكامل في الشاشات الصغيرة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">شؤون الطلاب</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">إدارة قيد الطلاب وحالاتهم الأكاديمية</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <UserPlus size={20} /> تسجيل طالب
        </button>
      </div>

      {/* Table Section & Mobile Cards */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* العرض للشاشات الكبيرة والمتوسطة (الجدول التقليدي) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-right whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="p-6">الطالب</th>
                <th className="p-6">الكلية / المستوى</th>
                <th className="p-6">المعدل (GPA)</th>
                <th className="p-6">الحالة</th>
                <th className="p-6 text-left pl-8">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition group">
                  <td className="p-6">
                    <div className="font-black text-slate-800">{student.name}</div>
                    <div className="text-[10px] text-slate-400 font-black mt-0.5">ID: {student.id}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-bold text-slate-600">{student.faculty}</div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">{student.level || 'غير محدد'}</div>
                  </td>
                  <td className="p-6 font-black text-blue-600 text-base">{student.gpa}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black ${
                      student.status === 'منتظم' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-6 text-left pl-8">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition duration-200">
                      <button onClick={() => handleOpenModal(student)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit3 size={16}/></button>
                      <button onClick={() => handleDelete(student.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* تعديل 3: تحويل الأسطر لكروت متكاملة تفاعلية وسهلة القراءة على شاشات الموبايل */}
        <div className="block md:hidden divide-y divide-slate-100">
          {students.map((student) => (
            <div key={student.id} className="p-5 flex flex-col gap-3 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-slate-800 text-sm">{student.name}</h4>
                  <p className="text-slate-400 text-[11px] font-bold mt-0.5">ID: {student.id} • {student.faculty}</p>
                  <p className="text-slate-400 text-[10px] font-medium mt-0.5">{student.level || 'المستوى الأكاديمي غير محدد'}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                    student.status === 'منتظم' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {student.status}
                  </span>
                  <div className="text-xs font-black text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded-md">
                    GPA: {student.gpa}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end items-center pt-2 border-t border-slate-50 gap-1 bg-slate-50/50 rounded-xl px-2">
                <button onClick={() => handleOpenModal(student)} className="p-2 text-blue-600 flex items-center gap-1 text-xs font-bold"><Edit3 size={15}/> تعديل</button>
                <div className="w-px h-4 bg-slate-200 mx-1"></div>
                <button onClick={() => handleDelete(student.id)} className="p-2 text-red-500 flex items-center gap-1 text-xs font-bold"><Trash2 size={15}/> حذف</button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal - إضافة وتعديل البيانات */}
      {isModalOpen && (
        // تعديل 4: ضبط هيكلية الـ Modal ليصبح تفاعلياً ومناسباً لحجم اللمس مع منع الالتصاق بالحواف
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-auto">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute left-6 top-6 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-lg transition"
            >
              <X size={20}/>
            </button>
            <h2 className="text-lg sm:text-xl font-black mb-6 text-slate-800 text-right">{editingId ? 'تعديل بيانات الطالب' : 'تسجيل طالب جديد'}</h2>
            
            <form onSubmit={handleSave} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">رقم القيد (ID)</label>
                <input required placeholder="مثال: 2024001" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right disabled:opacity-60" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} disabled={editingId} />
              </div>
              
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">اسم الطالب رباعي</label>
                <input required placeholder="أدخل اسم الطالب بالكامل" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">الكلية</label>
                  <input required placeholder="مثال: الحاسبات" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" value={formData.faculty} onChange={(e) => setFormData({...formData, faculty: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">المستوى أو الفرقة</label>
                  <input placeholder="مثال: المستوى الأول" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">حالة القيد</label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-sm outline-none cursor-pointer text-right" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="منتظم">منتظم</option>
                    <option value="مستجد">مستجد</option>
                    <option value="خريج">خريج</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-1.5 mr-1 uppercase tracking-widest">المعدل التراكمي (GPA)</label>
                  <input required placeholder="مثال: 3.9" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" value={formData.gpa} onChange={(e) => setFormData({...formData, gpa: e.target.value})} />
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3.5 sm:py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition text-sm sm:text-base">
                حفظ التغييرات
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;