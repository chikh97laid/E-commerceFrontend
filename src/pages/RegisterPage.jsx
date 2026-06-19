import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaUserPlus } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // الـ State مطابقة تماماً للـ Schema الخاصة بالسواجر
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/Accounts/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // التعامل مع أخطاء الـ Validation أو الـ Identity القادمة من دوت نت
        const serverErrorMessage = data.message || data.Message || "Registration failed. Please check your inputs.";
        throw new Error(serverErrorMessage);
      }

      toast.success("Account created successfully! Please login.");
      
      // التوجيه لصفحة الـ Login ليقوم المستخدم بتسجيل دخوله الأول
      navigate("/login");

    } catch (error) {
      console.error("Register Error Captured:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="ltr">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-full mb-2">
            <FaUserPlus className="text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500">
            Join InfoBook today! Please fill in your details to register
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-sm font-semibold text-gray-600 block">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                name="userName"
                required
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-left transition"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-sm font-semibold text-gray-600 block">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-left transition"
              />
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-sm font-semibold text-gray-600 block">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FaPhone />
              </span>
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white text-left transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-sm font-semibold text-gray-600 block">Password</label>
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
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;