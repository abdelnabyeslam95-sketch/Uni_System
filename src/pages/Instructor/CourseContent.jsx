import React, { useState } from 'react';
import { FileText, Plus, Trash2, Edit3, X, Video, Link as LinkIcon, Download, Eye } from 'lucide-react';

const CourseContent = () => {
  // داتا المحاضرات المرفوعة حالياً
  const [lessons, setLessons] = useState([
    { id: 1, title: "المحاضرة الأولى: مقدمة في الـ AI", type: "PDF", date: "2024-05-01" },
    { id: 2, title: "شرح الخوارزميات الذكية", type: "Video", date: "2024-05-05" },
    { id: 3, title: "الموقع المرجعي لأدوات الذكاء الاصطناعي", type: "Link", date: "2024-05-10" },
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
      setLessons([...lessons, { id: Date.now(), ...formData, date: new Date().toLocaleDateString('en-CA') }]);
    }
    setIsModalOpen(false);
  };

  // 3. حذف محاضرة
  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذا الملف؟ لن يتمكن الطلاب من رؤيته مجدداً.")) {
      setLessons(lessons.filter(l => l.id !== id));
    }
  };

  // دالة مساعدة لتحديد ستايل الأيقونات حسب النوع
  const getTypeStyles = (type) => {
    switch(type) {
      case 'Video': return { bg: 'bg-red-50 text-red-500', icon: <Video size={22}/> };
      case 'Link': return { bg: 'bg-indigo-50 text-indigo-500', icon: <LinkIcon size={22}/> };
      default: return { bg: 'bg-blue-50 text-blue-500', icon: <FileText size={22}/> };
    }
  };

  return (
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">إدارة محتوى المادة</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-bold mt-0.5">رفع المحاضرات، الملفات، واللينكات التعليمية</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100 text-sm sm:text-base"
        >
          <Plus size={20} /> إضافة محتوى جديد
        </button>
      </div>

      {/* المحتوى المرفوع (Grid متجاوب بالكامل) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {lessons.map((lesson) => {
          const styles = getTypeStyles(lesson.type);
          return (
            <div key={lesson.id} className="bg-white rounded-[2rem] border border-slate-100 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col justify-between">
              <div>
                {/* الجزء العلوي للكارت */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3.5 rounded-2xl ${styles.bg}`}>
                    {styles.icon}
                  </div>
                  {/* أزرار التحكم: تظهر بالهوفير في الابتوب وتظهر دوماً في الموبايل لسهولة اللمس */}
                  <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition duration-200 bg-slate-50 md:bg-transparent rounded-xl p-0.5 md:p-0">
                    <button onClick={() => handleOpenModal(lesson)} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition" title="تعديل"><Edit3 size={16}/></button>
                    <button onClick={() => handleDelete(lesson.id)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition" title="حذف"><Trash2 size={16}/></button>
                  </div>
                </div>
                
                <h3 className="font-black text-slate-800 text-sm sm:text-base mb-1.5 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">{lesson.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold mb-5 italic">تاريخ الرفع: {lesson.date}</p>
              </div>
              
              {/* أزرار الإجراءات السفلية المتكيفة حسب نوع المحتوى */}
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition">
                  <Eye size={14}/> {lesson.type === 'Link' ? 'زيارة الرابط' : 'معاينة'}
                </button>
                {lesson.type !== 'Link' && (
                  <button className="px-4 bg-blue-50 text-blue-600 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition flex items-center justify-center" title="تحميل الملف">
                    <Download size={14}/>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal - إضافة/تعديل محتوى */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-auto">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute left-6 top-6 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-lg transition"
            >
              <X size={20}/>
            </button>
            <h2 className="text-lg sm:text-xl font-black mb-6 text-slate-800 text-right">{editingId ? 'تعديل المحتوى التعليمي' : 'رفع محتوى جديد'}</h2>
            
            <form onSubmit={handleSave} className="space-y-4 sm:space-y-5 text-right">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1.5 mr-1 tracking-wider">عنوان المحاضرة أو الملف</label>
                <input 
                  required 
                  placeholder="مثال: المحاضرة الثانية: هياكل البيانات"
                  className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-sm transition text-right" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase block mb-1.5 mr-1 tracking-wider">نوع المحتوى التعليمي</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl font-bold text-sm outline-none cursor-pointer text-right" 
                  value={formData.type} 
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="PDF">ملف PDF / كتاب إلكتروني</option>
                  <option value="Video">فيديو شرح مصور</option>
                  <option value="Link">رابط خارجي / مرجع رقمي</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3.5 sm:py-4 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition text-sm sm:text-base">
                {editingId ? 'حفظ التعديلات الحالية' : 'بدء نشر المحتوى'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;