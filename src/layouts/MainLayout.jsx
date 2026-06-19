import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar.jsx';
import Footer from '../Components/Footer.jsx';
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {clearUserSession} from "../utils/clearUserSession.js";

const MainLayout = ({islogIn, loggingIn}) => {
  
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


useEffect(() => {
    const expiration = localStorage.getItem("expiration");
    const token = localStorage.getItem("token");

    // الفحص يعمل فقط إذا كان المستخدم مسجل دخوله بالفعل
    if (token && expiration) {
      const expireTime = new Date(expiration).getTime();
      const currentTime = new Date().getTime();

      // إذا مات التوكن للمستخدم العادي
      if (currentTime > expireTime) {
        // 1. تنظيف البيانات
        clearUserSession();

        localStorage.removeItem("phoneNumber");

        // 2. تحديث الستيت في الـ App.jsx ليختفي البروفايل فوراً
        loggingIn(false);

        // 3. تنبيه وتوجيه
        toast.warning("Your session has expired. Please login again.");
        navigate("/login");
      }
    }
  }, [navigate, islogIn, loggingIn]); // يتم الفحص تلقائياً عند كل تنقل بين الصفحات العادية

  return (
    /* 1. حولنا الـ Fragment إلى div وأعطيناه flex و min-h-screen */
    <div className="flex flex-col min-h-screen">
      
      <NavBar islogIn={islogIn} loggingIn={loggingIn} />
      
      {/* 2. وضعنا الـ Outlet داخل main وأعطيناه grow ليملأ الفراغ */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      
    </div>
  );
};

export default MainLayout;