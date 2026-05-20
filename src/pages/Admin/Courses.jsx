import React, { useState } from 'react';
import { BookOpen, Plus, Edit3, Trash2, X, Search, Clock, GraduationCap, Hash } from 'lucide-react';

const Courses = () => {
  // الحالة الأساسية للمواد
  const [courses, setCourses] = useState([
    { id: 1, code: "CS101", name: "مقدمة في علوم الحاسب", hours: 3, faculty: "الحاسبات والمعلومات", level: "المستوى الأول" },
    { id: 2, code: "ENG201", name: "رياضيات هندسية", hours: 4, faculty: "الهندسة", level: "المستوى الثاني" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ code: '', name: '', hours: 3, faculty: '', level: 'المستوى الأول' });

  // فتح النافذة للإضافة أو التعديل
  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingId(course.id);
      setFormData(course);
    } else {
      setEditingId(null);
      setFormData({ code: '', name: '', hours: 3, faculty: '', level: 'المستوى الأول' });
    }
    setIsModalOpen(true);
  };

  // حفظ المادة
  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setCourses(courses.map(c => c.id === editingId ? formData : c));
    } else {
      setCourses([...courses, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // حذف المادة
  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذا المقرر من المنظومة؟")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // تصفية المواد بناءً على البحث
  const filteredCourses = courses.filter(c => 
    c.name.includes(searchTerm) || c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">توصيف المقررات الدراسية</h1>
          <p className="text-slate-500 font-medium">إدارة المناهج والساعات المعتمدة لكل كلية</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <Plus size={20} /> إضافة مقرر جديد
        </button>
      </div>

      {/* البحث والفلترة */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 mb-6 flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            className="w-full bg-slate-50 rounded-xl pr-10 pl-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition font-bold text-sm" 
            placeholder="ابحث بكود أو اسم المادة..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* قائمة المواد */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-5 group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <BookOpen size={30} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md mb-1 inline-block uppercase tracking-tighter">
                    {course.code}
                  </span>
                  <h3 className="font-black text-slate-800 text-lg leading-tight">{course.name}</h3>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleOpenModal(course)} className="p-2 text-slate-400 hover:text-blue-600 transition"><Edit3 size={18}/></button>
                  <button onClick={() => handleDelete(course.id)} className="p-2 text-slate-400 hover:text-red-500 transition"><Trash2 size={18}/></button>
                </div>
              </div>
              
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                  <Clock size={14} className="text-blue-500"/> {course.hours} ساعات
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs font-bold">
                  <GraduationCap size={14} className="text-emerald-500"/> {course.faculty}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - نافذة الإضافة والتعديل */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute left-6 top-6 text-slate-400 hover:text-slate-600"><X/></button>
            <h2 className="text-xl font-black mb-6">{editingId ? 'تعديل المقرر' : 'إضافة مقرر جديد'}</h2>
            
            <form onSubmit={handleSave} className="space-y-4 text-right">
              <div>
                <label className="text-xs font-black text-slate-400 mb-1 block mr-1">كود المادة</label>
                <input required className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 mb-1 block mr-1">اسم المادة</label>
                <input required className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-400 mb-1 block mr-1">الساعات</label>
                  <input type="number" required className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" value={formData.hours} onChange={(e) => setFormData({...formData, hours: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-400 mb-1 block mr-1">المستوى</label>
                  <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none font-bold" value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})}>
                    <option>المستوى الأول</option>
                    <option>المستوى الثاني</option>
                    <option>المستوى الثالث</option>
                    <option>المستوى الرابع</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 mb-1 block mr-1">الكلية</label>
                <input required className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" value={formData.faculty} onChange={(e) => setFormData({...formData, faculty: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition">
                حفظ المقرر
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;