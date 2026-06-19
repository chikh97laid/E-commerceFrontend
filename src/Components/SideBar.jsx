import { NavLink } from "react-router-dom";
import {
  FaBox,
  FaList,
  FaShoppingCart,
  FaChartLine,
  FaUsers,
  FaBars,
  FaChevronLeft,
  FaPaypal,
  FaWallet,
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false); // للموبايل

  const sidebarItems = [
    { name: "Statistics", path: "/dashboard", icon: <FaChartLine /> },
    { name: "Products", path: "/dashboard/items", icon: <FaBox /> },
    { name: "Categories", path: "/dashboard/categories", icon: <FaList /> },
    { name: "Orders", path: "/dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Customers", path: "/dashboard/customers", icon: <FaUsers /> },
    { name: "Payments", path: "/dashboard/payments", icon: <FaPaypal /> },
    { name: "Reviews", path: "/dashboard/reviews", icon: <FaBars /> },
    { name: "Shippings", path: "/dashboard/shippings", icon: <FaBox /> }
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-300 hover:bg-indigo-800 hover:text-white"
    }`;

  return (
    <>
      {/* زر الموبايل */}
      <div className="md:hidden p-4 text-white bg-indigo-900 flex justify-between items-center">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <FaBars size={22} />
        </button>
        <span className="font-bold">Admin</span>
      </div>

      {/* Overlay للموبايل */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full bg-indigo-900 text-white shadow-xl
          transition-all duration-300 flex justify-between flex-col
          ${isOpen ? "w-64" : "w-20"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-700 min-h-16">
          {isOpen && (
            <span className="text-xl font-bold animate-sizeOut">
              Admin Panel
            </span>
          )}

          {/* زر collapse */}
          <button onClick={() => setIsOpen(!isOpen)}>
            <FaChevronLeft
              className={`transition-transform ${!isOpen && "rotate-180"}`}
            />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <NavLink key={index} to={item.path} end className={navLinkClass}>
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-indigo-700">
          <NavLink to="/" className="text-sm text-indigo-300 hover:text-white">
            ← {isOpen && "Back to Website"}
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
