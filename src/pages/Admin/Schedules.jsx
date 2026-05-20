import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, User, BookOpen, Trash2, X } from 'lucide-react';

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
    <div className="p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الجداول الدراسية</h1>
          <p className="text-slate-500 font-medium">تنظيم المحاضرات، القاعات، وتكليفات أعضاء هيئة التدريس</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg"
        >
          <Plus size={20} /> إضافة حصة/محاضرة
        </button>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 hover:shadow-xl transition-all border-r-4 border-r-blue-600">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-black">
                {item.day}
              </span>
              <button 
                onClick={() => setSchedules(schedules.filter(s => s.id !== item.id))}
                className="text-slate-300 hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600" /> {item.course}
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                <User size={16} className="text-slate-400" /> {item.instructor}
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                <Clock size={16} className="text-slate-400" /> {item.time}
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                <MapPin size={16} className="text-slate-400" /> {item.room}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - إضافة موعد جديد */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute left-6 top-6 text-slate-400"><X/></button>
            <h2 className="text-xl font-black mb-6 text-right">جدولة محاضرة جديدة</h2>
            
            <form onSubmit={handleAddSchedule} className="space-y-4 text-right" dir="rtl">
              <input required placeholder="اسم المادة" className="w-full bg-slate-50 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold" onChange={(e) => setFormData({...formData, course: e.target.value})} />
              <input required placeholder="اسم الدكتور" className="w-full bg-slate-50 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold" onChange={(e) => setFormData({...formData, instructor: e.target.value})} />
              
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full bg-slate-50 border rounded-xl p-3 font-bold outline-none" onChange={(e) => setFormData({...formData, day: e.target.value})}>
                  <option>الأحد</option>
                  <option>الاثنين</option>
                  <option>الثلاثاء</option>
                  <option>الأربعاء</option>
                  <option>الخميس</option>
                </select>
                <input required placeholder="الوقت (مثلاً 9-11)" className="w-full bg-slate-50 border rounded-xl p-3 outline-none font-bold" onChange={(e) => setFormData({...formData, time: e.target.value})} />
              </div>

              <input required placeholder="القاعة أو المعمل" className="w-full bg-slate-50 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold" onChange={(e) => setFormData({...formData, room: e.target.value})} />
              
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition">
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