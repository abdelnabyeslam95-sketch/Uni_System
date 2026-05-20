import React, { useState } from 'react';
import { Wallet, Plus, Edit3, Trash2, X, Search, DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Finance = () => {
  // 1. البيانات الأساسية (مصروفات الطلاب أو المعاملات)
  const [transactions, setTransactions] = useState([
    { id: 1, studentName: "أحمد ياسين", type: "مصروفات دراسية", amount: 15000, date: "2024-05-10", status: "مدفوع" },
    { id: 2, studentName: "سارة محمد", type: "رسوم معامل", amount: 2000, date: "2024-05-11", status: "متأخر" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ studentName: '', type: 'مصروفات دراسية', amount: '', date: '', status: 'مدفوع' });

  // 2. التحكم في النافذة (فتح للإضافة أو التعديل)
  const handleOpenModal = (trans = null) => {
    if (trans) {
      setEditingId(trans.id);
      setFormData(trans);
    } else {
      setEditingId(null);
      setFormData({ studentName: '', type: 'مصروفات دراسية', amount: '', date: new Date().toISOString().split('T')[0], status: 'مدفوع' });
    }
    setIsModalOpen(true);
  };

  // 3. حفظ البيانات (إضافة/تعديل)
  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setTransactions(transactions.map(t => t.id === editingId ? formData : t));
    } else {
      setTransactions([...transactions, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // 4. حذف معاملة
  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا السجل المالي؟")) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  return (
    <div className="p-6 font-sans" dir="rtl">
      {/* قسم الإحصائيات المالية السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><TrendingUp size={24}/></div>
            <span className="text-emerald-500 flex items-center text-xs font-black"><ArrowUpRight size={14}/> +12%</span>
          </div>
          <p className="text-slate-400 font-bold text-xs mt-4 uppercase">إجمالي المحصلات</p>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">1,250,000 ج.م</h2>
        </div>
        
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Users size={24}/></div>
          </div>
          <p className="text-slate-400 font-bold text-xs mt-4 uppercase">طلاب لم يسددوا</p>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">45 طالب</h2>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-blue-600 shadow-lg bg-blue-600 text-white cursor-pointer hover:scale-105 transition" onClick={() => handleOpenModal()}>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/20 rounded-2xl"><Plus size={24}/></div>
          </div>
          <p className="text-white/70 font-bold text-xs mt-4 uppercase">إجراء سريع</p>
          <h2 className="text-2xl font-black tracking-tight">إضافة فاتورة/سند</h2>
        </div>
      </div>

      {/* جدول المعاملات المالي */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
           <h3 className="font-black text-slate-800">سجل العمليات المالية</h3>
           <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input className="bg-slate-50 border-none rounded-xl pr-10 pl-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="بحث عن طالب..." />
           </div>
        </div>
        <table className="w-full text-right">
          <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="p-6">الطالب</th>
              <th className="p-6">نوع الدفع</th>
              <th className="p-6">المبلغ</th>
              <th className="p-6">التاريخ</th>
              <th className="p-6 text-center">الحالة</th>
              <th className="p-6">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition group">
                <td className="p-6 font-black text-slate-700">{t.studentName}</td>
                <td className="p-6 text-slate-500 font-bold text-sm">{t.type}</td>
                <td className="p-6 font-black text-slate-800">{t.amount.toLocaleString()} ج.م</td>
                <td className="p-6 text-slate-400 text-xs font-bold">{t.date}</td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${t.status === 'مدفوع' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => handleOpenModal(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"><Edit3 size={16}/></button>
                    <button onClick={() => handleDelete(t.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - إضافة/تعديل معاملة */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute left-8 top-8 text-slate-300 hover:text-slate-600 transition"><X size={24}/></button>
            <h2 className="text-2xl font-black mb-8 text-slate-800">{editingId ? 'تعديل السند المالي' : 'إنشاء سند مالي جديد'}</h2>
            
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 mr-1">اسم الطالب</label>
                <input required className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold transition" value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 mr-1">المبلغ (ج.م)</label>
                  <input type="number" required className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold transition" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 mr-1">الحالة</label>
                  <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none cursor-pointer" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="مدفوع">مدفوع</option>
                    <option value="متأخر">متأخر</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                {editingId ? 'تحديث السند' : 'إتمام العملية المالية'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;