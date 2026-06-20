import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaUserCircle } from "react-icons/fa";
import logo from "../assets/Images/logo.png";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {clearUserSession} from "../utils/clearUserSession.js";
import API_URL from "../services/API_URL.jsx"; // استيراد رابط الـ API من ملف منفصل

const NavBar = ({ islogIn, loggingIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`); // استخدم رابط الـ API من ملف منفصل
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = () => {
    // 1. مسح البيانات
    clearUserSession();

    localStorage.removeItem("phoneNumber");

    // 2. تحديث الستيت
    loggingIn(false);

    // 3. التوجيه وإظهار التوست بأمان
    toast.info("Logged out successfully");
    navigate("/");
  };

  // 1. تعريف مصفوفة الروابط والقوائم (المصدر الوحيد للحقيقة)
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    {
      name: "Categories",
      isDropdown: true,
      dropdownItems: categories.map((cat) => ({
        name: cat.name,
        path: `/products?categoryId=${cat.id}`,
      })),
    },
  ];

  if (!islogIn) {
    navItems.push({ name: "Login", path: "/login" });
    navItems.push({ name: "Register", path: "/register" });
  } else {
    const profileMenu = [];

    const userRoles = localStorage.getItem("roles");
    if (userRoles && userRoles.includes("Admin")) {
      profileMenu.push({ name: "Dashboard", path: "/dashboard" });
    }

    profileMenu.push({ name: "MyProfile", path: "/profile" });
    profileMenu.push({ name: "Logout", path: "/logout", isLogout: true });

    navItems.push({
      name: "Profile",
      isProfile: true,
      isDropdown: true,
      dropdownItems: profileMenu,
    });
  }
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 transition duration-300 rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 transition duration-300 rounded-md px-3 py-2";

  return (
    <nav className="relative z-50 bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* اللوجو */}
          <NavLink className="flex items-center" to="/">
            <img className="h-10 w-auto" src={logo} alt="InfoBook" />
            <span className="hidden md:block text-white text-2xl font-bold ml-2">
              InfoBook
            </span>
          </NavLink>

          {/* زر المنيو للجوال */}
          <div className="md:hidden">
            <button
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* روابط الديسكتوب */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <div key={index} className="relative group px-1 py-2">
                {item.isDropdown ? (
                  <>
                    <div className="flex items-center gap-1 text-white cursor-pointer px-3 py-2">
                      {item.isProfile ? (
                        <FaUserCircle className="text-2xl" />
                      ) : (
                        item.name
                      )}
                      <FaChevronDown className="text-xs group-hover:rotate-180 transition-transform" />
                    </div>
                    {/* القائمة المنسدلة */}
                    <div className="absolute top-full right-0 w-40 bg-white shadow-xl rounded-md py-2 hidden group-hover:block border border-gray-100 animate-fadeIn">
                      {item.dropdownItems.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          onClick={sub.isLogout ? handleLogout : undefined}
                          className={`block custom-dropdown-item px-4 py-2 text-sm ${sub.isLogout ? "text-red-600 border-t" : "text-gray-700"} hover:bg-indigo-50`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink to={item.path} className={linkClass}>
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* قائمة الجوال */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800 p-4 space-y-2 border-t border-indigo-600 animate-fadeIn">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.isDropdown ? (
                <div className="space-y-1 border border-indigo-500 rounded-md">
                  <div className="text-white font-bold px-3 mt-4">
                    {item.name}
                  </div>
                  {item.dropdownItems.map((sub, i) => (
                    <Link
                      key={i}
                      to={sub.path}
                      className="block text-blue px-6 py-2 hover:bg-indigo-900 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={
                    linkClass +
                    " font-bold border border-indigo-500 block py-3 px-4"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
