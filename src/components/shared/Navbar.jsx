import React from 'react';
import { Bell, User, Search, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// أضفنا البروب toggleSidebar هنا لفتح وإغلاق القائمة الجانبية في الموبايل
const Navbar = ({ user, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    // تقليل الـ padding في الموبايل (px-4 md:px-8) ليعطي مساحة ممتازة للأزرار
    <nav className="bg-white border-b border-slate-100 h-16 flex items-center justify-between px-4 md:px-8 shadow-sm z-10 w-full" dir="rtl">
      
      {/* 1. الجزء الأيمن (في الشاشات الكبيرة محرك بحث، وفي الموبايل زرار القائمة الجانبية واسم السيستم) */}
      <div className="flex items-center gap-3">
        {/* زرار المنيو للموبايل: يظهر فقط في الشاشات الأقل من md */}
        <button 
          onClick={toggleSidebar} 
          className="block md:hidden text-slate-600 p-2 hover:bg-slate-50 rounded-xl transition"
        >
          <Menu size={24} />
        </button>

        {/* محرك البحث الداخلي: يختفي في الموبايل ويظهر من أول الـ md بشكل ممتاز */}
        <div className="relative w-72 lg:w-96 hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث سريع عن طالب أو مادة..." 
            className="w-full bg-slate-50 border-none rounded-xl pr-10 pl-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition text-right"
          />
        </div>

        {/* براند النظام يظهر فقط في الموبايل لحفظ توازن الهيدر بصرياً */}
        <span className="block md:hidden bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-black tracking-wider text-lg">
          UNI-SYS
        </span>
      </div>

      {/* 2. الجزء الأيسر: التنبيهات ومعلومات المستخدم الأكاديمية */}
      {/* تقليل الـ gap بين العناصر في الموبايل (gap-3 md:gap-6) ليتناسب مع عرض الشاشة */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* التنبيهات مع شارة العدد */}
        <button className="relative text-slate-500 hover:text-blue-600 transition p-2 hover:bg-slate-50 rounded-full">
          <Bell size={22} />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-bold">
            3
          </span>
        </button>

        {/* فاصل عمودي أنيق */}
        <div className="h-8 w-px bg-slate-200 mx-0.5 md:mx-1"></div>

        {/* بروفايل المستخدم الحالي */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* اسم المستخدم والدور الرقمي: يختفي في الشاشات الصغيرة جداً (hidden sm:flex) لتفادي كسر السطر */}
          <div className="text-right hidden sm:flex flex-col items-start">
            <p className="text-sm font-bold text-slate-800 leading-tight">
              {user?.name || "إسلام عبد النبي"}
            </p>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter mt-0.5">
              {user?.role === 'admin' ? 'مدير النظام' : user?.role === 'instructor' ? 'دكتور' : 'طالب'}
            </p>
          </div>
          
          <div className="group relative">
            {/* أيقونة المستخدم المحمية: تقليل حجم الحاوية وتعديل استجابة الأيقونة كلاسات Tailwind */}
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 cursor-pointer hover:bg-blue-700 transition">
              <User className="w-4.5 h-4.5 md:w-5 md:h-5" />
            </div>
            
            {/* القائمة المنسدلة (Dropdown) تظهر بنعومة عند الحوم (Hover) */}
            {/* محاذاة يسارية مظبوطة تماماً بالشاشات الصغيرة لمنع الخروج عن الإطار (left-0) */}
            <div className="absolute left-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto p-2 z-50">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition text-right"
              >
                <LogOut size={16} className="shrink-0" /> تسجيل الخروج
              </button>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;