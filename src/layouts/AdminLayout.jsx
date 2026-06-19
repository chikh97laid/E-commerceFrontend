import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SideBar.jsx";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content */}
      <div
        className={`
          transition-all duration-300
          ${isOpen ? "md:ml-64" : "md:ml-20"}
        `}
      >
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLayout;
