import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // التأكد من حالة تسجيل الدخول
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // لو مش مسجل دخول، اطرده فوراً لصفحة اللوجن
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // لو مسجل دخول، يسمح له يمر ويشوف الصفحة عادي جداً
  return <Outlet />;
};

export default PrivateRoute;