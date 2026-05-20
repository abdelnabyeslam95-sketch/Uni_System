import React from 'react';
import { Bell, User, Search, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem('user'); // مسح بيانات المستخدم من الذاكرة
    navigate('/login'); // العودة لصفحة الدخول
  };

  return (
    <nav className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-8 shadow-sm z-10">
      
      {/* 1. الجزء الأيمن: محرك بحث داخلي */}
      <div className="relative w-96 hidden md:block">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="بحث سريع عن طالب أو مادة..." 
          className="w-full bg-slate-50 border-none rounded-xl pr-10 pl-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition text-right"
        />
      </div>

      {/* 2. الجزء الأيسر: التنبيهات ومعلومات المستخدم */}
      <div className="flex items-center gap-6">
        
        {/* التنبيهات */}
        <button className="relative text-slate-500 hover:text-blue-600 transition p-2 hover:bg-slate-50 rounded-full">
          <Bell size={22} />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">
            3
          </span>
        </button>

        {/* فاصل عمودي */}
        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        {/* بروفايل المستخدم */}
        <div className="flex items-center gap-4">
          <div className="text-left flex flex-col items-end">
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {user?.name || "مستخدم عام"}
            </p>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">
              {user?.role === 'admin' ? 'مدير النظام' : user?.role === 'instructor' ? 'دكتور' : 'طالب'}
            </p>
          </div>
          
          <div className="group relative">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 cursor-pointer hover:bg-blue-700 transition">
              <User size={20} />
            </div>
            
            {/* قائمة منسدلة بسيطة عند الوقوف على الصورة (اختياري) */}
            <div className="absolute left-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto p-2">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={16} /> تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;