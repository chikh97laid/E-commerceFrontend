import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ loggingIn }) => {
  // الحقول المطلوبة بناءً على السواجر الخاص بك
  const [formData, setFormData] = useState({
    userNameOrEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/Accounts/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // الباك إند يقبل json
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const serverErrorMessage =
          data.message || data.Message || "Username or password is incorrect";
        throw new Error(serverErrorMessage);
      }

      // حفظ البيانات بدقة كما تعود من السواجر الخاص بك
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("expiration", data.expiration);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("userEmail", data.userEmail || "");
      localStorage.setItem("phoneNumber", data.phoneNumber || "");

      toast.success("login successful!");

      loggingIn(true);
      navigate("/");
    } catch (error) {
      console.error("Login Error Captured:", error.message);

      // إظهار التوست للمستخدم
      toast.error(
        error.message || "An error occurred while connecting to the server",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
      dir="ltr"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-full mb-2">
            <FaSignInAlt className="text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-sm text-gray-500">
            Welcome back! Please enter your credentials to access the system
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username or Email Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-sm font-semibold text-gray-600 block">
              Username or Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                name="userNameOrEmail"
                required
                value={formData.userNameOrEmail}
                onChange={handleChange}
                placeholder="Enter your username or email"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-left transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-sm font-semibold text-gray-600 block">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-left tracking-widest transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
