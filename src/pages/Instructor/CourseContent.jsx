import React, { useState } from 'react';
import { FileText, Plus, Trash2, Edit3, X, Video, Link as LinkIcon, Download, Eye } from 'lucide-react';

const CourseContent = () => {
  // داتا المحاضرات المرفوعة حالياً
  const [lessons, setLessons] = useState([
    { id: 1, title: "المحاضرة الأولى: مقدمة في الـ AI", type: "PDF", date: "2024-05-01" },
    { id: 2, title: "شرح الخوارزميات الذكية", type: "Video", date: "2024-05-05" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', type: 'PDF' });

  // 1. فتح نافذة الإضافة أو التعديل
  const handleOpenModal = (lesson = null) => {
    if (lesson) {
      setEditingId(lesson.id);
      setFormData({ title: lesson.title, type: lesson.type });
    } else {
      setEditingId(null);
      setFormData({ title: '', type: 'PDF' });
    }
    setIsModalOpen(true);
  };

  // 2. حفظ البيانات (إضافة/تعديل)
  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setLessons(lessons.map(l => l.id === editingId ? { ...l, ...formData } : l));
    } else {
      setLessons([...lessons, { id: Date.now(), ...formData, date: new Date().toLocaleDateString() }]);
    }
    setIsModalOpen(false);
  };

  // 3. حذف محاضرة
  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذا الملف؟ لن يتمكن الطلاب من رؤيته مجدداً.")) {
      setLessons(lessons.filter(l => l.id !== id));
    }
  };

  return (
    <div className="p-6 font-sans" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة محتوى المادة</h1>
          <p className="text-slate-500 font-bold">رفع المحاضرات، الملفات، واللينكات التعليمية</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <Plus size={20} /> إضافة محتوى جديد
        </button>
      </div>

      {/* المحتوى المرفوع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-4 rounded-2xl ${lesson.type === 'Video' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                {lesson.type === 'Video' ? <Video size={24}/> : <FileText size={24}/>}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => handleOpenModal(lesson)} className="p-2 text-slate-400 hover:text-blue-600"><Edit3 size={16}/></button>
                <button onClick={() => handleDelete(lesson.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
              </div>
            </div>
            
            <h3 className="font-black text-slate-800 mb-2">{lesson.title}</h3>
            <p className="text-xs text-slate-400 font-bold mb-6 italic">تاريخ الرفع: {lesson.date}</p>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition">
                <Eye size={14}/> معاينة
              </button>
              <button className="px-4 bg-blue-50 text-blue-600 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition">
                <Download size={14}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - إضافة/تعديل محتوى */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute left-8 top-8 text-slate-300 hover:text-slate-600"><X size={24}/></button>
            <h2 className="text-2xl font-black mb-8 text-slate-800">{editingId ? 'تعديل المحتوى' : 'رفع محتوى جديد'}</h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-2 mr-1">عنوان المحاضرة/الملف</label>
                <input required className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold transition" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-2 mr-1">نوع المحتوى</label>
                <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none cursor-pointer" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                  <option value="PDF">ملف PDF / كتاب</option>
                  <option value="Video">فيديو شرح</option>
                  <option value="Link">رابط خارجي</option>
                </select>
              </div>
              <button className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black shadow-xl hover:bg-blue-700 transition">
                {editingId ? 'حفظ التعديلات' : 'بدء الرفع الآن'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;