import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogIn,
  School,
  Mail,
  Lock,
  User,
  ShieldCheck
} from 'lucide-react';

const AuthPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');

  const [role, setRole] = useState('student');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleAuth = (e) => {
    e.preventDefault();

    // اسم المستخدم
    const displayName =
      activeTab === 'signup'
        ? formData.name
        : formData.email.split('@')[0];

    // بيانات المستخدم
    const userData = {
      name: displayName,
      role: role,
      email: formData.email
    };

    // حفظ البيانات
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');

    // مسارات التحويل
    const routes = {
      admin: '/admin/dashboard',
      instructor: '/instructor/dashboard',
      student: '/student/dashboard'
    };

    const target = routes[role];

    console.log('USER =>', userData);
    console.log('TARGET =>', target);

    // التحويل للداشبورد
    if (target) {
      navigate(target, { replace: true });

      // لو فيه مشكلة جرب ده بدل navigate
      // window.location.href = target;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans relative overflow-hidden"
      dir="rtl"
    >
      {/* الخلفية */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

      {/* الكارد */}
      <div className="max-w-[450px] w-full bg-white/80 backdrop-blur-xl rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-white relative z-10">

        {/* Header */}
        <div className="pt-10 pb-6 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25"></div>

            <div className="relative w-20 h-20 bg-white rounded-[2rem] shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-50">
              <School size={40} className="text-blue-600" />
            </div>
          </div>

          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-1">
            UNI
            <span className="text-blue-600 font-serif">.</span>
            SYS
          </h1>

          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            نظام إدارة الجامعة الذكي
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-8 mb-8 p-1.5 bg-slate-100/50 rounded-[2rem] flex relative">

          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3.5 rounded-[1.6rem] font-black text-sm z-10 transition-all duration-500 ${
              activeTab === 'login'
                ? 'text-blue-600'
                : 'text-slate-400'
            }`}
          >
            دخول
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3.5 rounded-[1.6rem] font-black text-sm z-10 transition-all duration-500 ${
              activeTab === 'signup'
                ? 'text-blue-600'
                : 'text-slate-400'
            }`}
          >
            حساب جديد
          </button>

          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-[1.5rem] shadow-sm transition-all duration-500 ease-out ${
              activeTab === 'login'
                ? 'right-1.5'
                : 'right-[50%]'
            }`}
          ></div>
        </div>

        {/* الفورم */}
        <div className="px-10 pb-12">
          <form onSubmit={handleAuth} className="space-y-5">

            {/* نوع الحساب */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-wider block">
                نوع الحساب:
              </label>

              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-12 py-4 outline-none focus:border-blue-500 focus:bg-white font-bold text-slate-700 appearance-none transition-all"
                >
                  <option value="student">
                    طالب جامعي (Student)
                  </option>

                  <option value="instructor">
                    أستاذ دكتور (Professor)
                  </option>

                  <option value="admin">
                    مدير النظام (Admin)
                  </option>
                </select>

                <ShieldCheck
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500"
                  size={20}
                />
              </div>
            </div>

            {/* الاسم */}
            {activeTab === 'signup' && (
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="الاسم الكامل"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-12 py-4 outline-none focus:border-blue-500 font-bold transition-all"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                />

                <User
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                  size={20}
                />
              </div>
            )}

            {/* البريد */}
            <div className="relative">
              <input
                required
                type="email"
                placeholder="البريد الجامعي"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-12 py-4 outline-none focus:border-blue-500 font-bold text-left transition-all"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                }
              />

              <Mail
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={20}
              />
            </div>

            {/* الباسورد */}
            <div className="relative">
              <input
                required
                type="password"
                placeholder="كلمة المرور"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-12 py-4 outline-none focus:border-blue-500 font-bold text-left transition-all"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value
                  })
                }
              />

              <Lock
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={20}
              />
            </div>

            {/* زر الدخول */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-[2rem] font-black text-lg hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 mt-6"
            >
              <span>
                {activeTab === 'login'
                  ? 'دخول مباشر'
                  : 'تأكيد التسجيل'}
              </span>

              <LogIn size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;