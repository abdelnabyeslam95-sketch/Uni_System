import React, { useState } from 'react';
import { Plus, Clock, MapPin, User, BookOpen, Trash2, X } from 'lucide-react';

const Schedules = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, course: "الذكاء الاصطناعي", instructor: "د. إسلام عبد النبي", room: "قاعة 101", day: "الأحد", time: "09:00 ص - 11:00 ص" },
    { id: 2, course: "هندسة البرمجيات", instructor: "د. أحمد علي", room: "معمل الحاسب", day: "الاثنين", time: "11:00 ص - 01:00 م" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ course: '', instructor: '', room: '', day: 'الأحد', time: '' });

  const handleAddSchedule = (e) => {
    e.preventDefault();
    setSchedules([...schedules, { ...formData, id: Date.now() }]);
    setIsModalOpen(false);
  };

  return (
    // تعديل 1: مرونة الـ padding الخارجي وتحديد اتجاه النصوص العام للسيستم بالكامل
    <div className="p-4 sm:p-6 font-sans" dir="rtl">
      
      {/* Header */}
      {/* تعديل 2: مرونة الهيدر (flex-col في الموبايل يتحول إلى sm:flex-row في الشاشات الأكبر) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">إدارة الجداول الدراسية</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">تنظيم المحاضرات، القاعات، وتكليفات أعضاء هيئة التدريس</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <Plus size={20} /> إضافة حصة/محاضرة
        </button>
      </div>

      {/* Schedule Grid */}
      {/* تعديل 3: ضبط توزيع شبكة الكروت بالتدريج (1 للموبايل، 2 للـ md، و 3 للـ lg) والمسافات البينية gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {schedules.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-5 sm:p-6 hover:shadow-md transition-all border-r-4 border-r-blue-600 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-50 text-blue-600 px-3.5 py-1 rounded-full text-xs font-black">
                  {item.day}
                </span>
                <button 
                  onClick={() => setSchedules(schedules.filter(s => s.id !== item.id))}
                  className="text-slate-300 hover:text-red-500 p-1 hover:bg-slate-50 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-800 mb-4 flex items-center gap-2 leading-tight">
                <BookOpen size={18} className="text-blue-600 shrink-0" /> {item.course}
              </h3>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-slate-600 text-xs sm:text-sm font-bold">
                  <User size={16} className="text-slate-400 shrink-0" /> {item.instructor}
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-xs sm:text-sm font-bold">
                  <Clock size={16} className="text-slate-400 shrink-0" /> {item.time}
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-xs sm:text-sm font-bold">
                  <MapPin size={16} className="text-slate-400 shrink-0" /> {item.room}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - إضافة موعد جديد */}
      {isModalOpen && (
        // تعديل 4: تطبيق هيكلية الـ Modals المتجاوبة لمنع الالتصاق بالحواف وتسهيل الاستخدام باللمس
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute left-6 top-6 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-lg transition">
              <X size={20}/>
            </button>
            <h2 className="text-lg sm:text-xl font-black mb-6 text-slate-800 text-right">جدولة محاضرة جديدة</h2>
            
            <form onSubmit={handleAddSchedule} className="space-y-4 text-right">
              <div>
                <input required placeholder="اسم المادة" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" onChange={(e) => setFormData({...formData, course: e.target.value})} />
              </div>
              <div>
                <input required placeholder="اسم الدكتور" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" onChange={(e) => setFormData({...formData, instructor: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-sm outline-none cursor-pointer text-right" onChange={(e) => setFormData({...formData, day: e.target.value})}>
                    <option>الأحد</option>
                    <option>الاثنين</option>
                    <option>الثلاثاء</option>
                    <option>الأربعاء</option>
                    <option>الخميس</option>
                  </select>
                </div>
                <div>
                  <input required placeholder="الوقت (مثلاً 9-11)" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" onChange={(e) => setFormData({...formData, time: e.target.value})} />
                </div>
              </div>

              <div>
                <input required placeholder="القاعة أو المعمل" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm text-right" onChange={(e) => setFormData({...formData, room: e.target.value})} />
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3.5 sm:py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition text-sm sm:text-base">
                تثبيت في الجدول
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;