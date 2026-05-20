import React, { useState } from 'react';
import { FileText, Download, Plus, Search, Trash2, Edit3, FileSpreadsheet, FilePieChart, X } from 'lucide-react';

const Reports = () => {
  // 1. بيانات التقارير المُصدرة
  const [reports, setReports] = useState([
    { id: 1, title: "تقرير المصروفات السنوي", type: "مالي", date: "2024-05-10", status: "مكتمل" },
    { id: 2, title: "نتائج الفصل الدراسي الأول", type: "أكاديمي", date: "2024-05-11", status: "قيد المراجعة" },
    { id: 3, title: "كشف حضور هيئة التدريس", type: "إداري", date: "2024-05-12", status: "مكتمل" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', type: 'مالي', date: '', status: 'مكتمل' });

  // 2. التحكم في المودال (إضافة/تعديل)
  const handleOpenModal = (report = null) => {
    if (report) {
      setEditingId(report.id);
      setFormData(report);
    } else {
      setEditingId(null);
      setFormData({ title: '', type: 'مالي', date: new Date().toISOString().split('T')[0], status: 'مكتمل' });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setReports(reports.map(r => r.id === editingId ? formData : r));
    } else {
      setReports([...reports, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("هل تريد حذف هذا التقرير نهائياً؟")) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  return (
    <div className="p-6 font-sans" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800">مركز التقارير والاستعلامات</h1>
          <p className="text-slate-500 font-bold">تحليل البيانات وإصدار الشهادات والكشوفات الرسمية</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition shadow-lg"
        >
          <Plus size={20} /> إصدار تقرير جديد
        </button>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-md transition cursor-pointer">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><FileSpreadsheet size={24}/></div>
          <div>
            <h4 className="font-black text-slate-800">تقارير Excel</h4>
            <p className="text-xs text-slate-400 font-bold">كشوفات الطلاب والدرجات</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-md transition cursor-pointer">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl"><FilePieChart size={24}/></div>
          <div>
            <h4 className="font-black text-slate-800">تحليلات بيانية</h4>
            <p className="text-xs text-slate-400 font-bold">نسب النجاح والرسوب</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 hover:shadow-md transition cursor-pointer text-blue-600">
          <div className="p-4 bg-blue-600 text-white rounded-2xl"><Download size={24}/></div>
          <div>
            <h4 className="font-black">تحميل الكل</h4>
            <p className="text-[10px] uppercase font-black opacity-60 tracking-widest">Backup System</p>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="p-6">عنوان التقرير</th>
              <th className="p-6">النوع</th>
              <th className="p-6">تاريخ الإصدار</th>
              <th className="p-6 text-center">الحالة</th>
              <th className="p-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50/50 transition group">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-slate-400" />
                    <span className="font-black text-slate-700">{report.title}</span>
                  </div>
                </td>
                <td className="p-6 text-sm font-bold text-slate-500">{report.type}</td>
                <td className="p-6 text-xs text-slate-400 font-bold">{report.date}</td>
                <td className="p-6 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${
                    report.status === 'مكتمل' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleOpenModal(report)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition"><Edit3 size={16}/></button>
                    <button onClick={() => handleDelete(report.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"><Trash2 size={16}/></button>
                    <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition"><Download size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - إضافة/تعديل تقرير */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative animate-in zoom-in duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute left-8 top-8 text-slate-300 hover:text-slate-600"><X size={24}/></button>
            <h2 className="text-2xl font-black mb-8 text-slate-800">{editingId ? 'تعديل التقرير' : 'إصدار تقرير جديد'}</h2>
            
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mr-1">اسم التقرير</label>
                <input required className="w-full bg-slate-50 border rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-blue-600" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mr-1">نوع التقرير</label>
                  <select className="w-full bg-slate-50 border rounded-2xl p-4 font-bold outline-none" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="مالي">مالي</option>
                    <option value="أكاديمي">أكاديمي</option>
                    <option value="إداري">إداري</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mr-1">الحالة</label>
                  <select className="w-full bg-slate-50 border rounded-2xl p-4 font-bold outline-none" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="مكتمل">مكتمل</option>
                    <option value="قيد المراجعة">قيد المراجعة</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black shadow-xl hover:bg-blue-700 transition">
                {editingId ? 'حفظ التعديلات' : 'تأكيد إصدار التقرير'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;