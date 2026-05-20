import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer"; 

const DashboardLayout = () => {
  const userString = localStorage.getItem('user');
  if (!userString) return <Navigate to="/login" replace />; // حماية: لو مش مسجل يطرده للوجن
  
  const user = JSON.parse(userString);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans" dir="rtl">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} />
        <main className="flex-1 p-6 overflow-y-auto flex flex-col">
          <div className="flex-1">
            <Outlet /> 
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;