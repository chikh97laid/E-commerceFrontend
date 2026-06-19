import React, { useState } from "react";
import { FaUserShield, FaEnvelope, FaPhone, FaIdCard, FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  // دالة ذكية لتحويل الـ roles القادمة من الـ localStorage بأمان
  const getParsedRoles = () => {
    const storedRoles = localStorage.getItem("roles");
    if (!storedRoles) return ["User"]; // القيمة الافتراضية إذا لم يجد شيئاً
    
    try {
      // إذا كانت مخزنة كـ JSON Array مثل ["Admin", "Customer"]
      return JSON.parse(storedRoles);
    } catch (e) {
      // إذا كانت مخزنة كنص عادي مفصول بفاصلة أو نص واحد
      return storedRoles.split(",").map(role => role.trim().replace(/[\[\]"]/g, ""));
    }
  };

  const [user] = useState({
    userName: localStorage.getItem("userName") || "Mohamed", 
    id: localStorage.getItem("userId") || "N/A",
    roles: getParsedRoles(), // هنا أصبح لدينا مصفوفة حقيقية نقدر نعمل عليها map
    email: localStorage.getItem("userEmail") || "user@example.com",
    phoneNumber: localStorage.getItem("phoneNumber") || "+213 555 12 34 56"
  });

  return (
    // الخلفية بني دافئ خفيف جداً (amber-50) والتوجيه من اليسار لليمين إجباري (ltr)
    <div className="min-h-screen bg-[#86c5ee] py-12 px-4 flex justify-center items-center" dir="ltr">
      
      {/* الكارت الرئيسي: بلون بني فاتح كريمي، مع حواف ناعمة وظل عميق واحترافي */}
      <div className="max-w-md w-full bg-[#FAF6F0] rounded-3xl shadow-xl border border-[#EFE7DC] p-8 space-y-6 transform transition-all hover:scale-[1.01]">
        
        {/* Profile Header */}
        <div className="text-center border-b border-[#EFE7DC] pb-6">
          <div className="inline-block relative mb-3">
            {/* أيقونة البروفايل بلون بني دافئ داكن */}
            <FaUserCircle className="text-8xl text-[#8C6D53]" />
            <span className="absolute bottom-1 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-[#FAF6F0]"></span>
          </div>
          <h2 className="text-2xl font-bold text-[#594433]">{user.userName}</h2>
          
          {/* قسم الـ Roles: يلف على المصفوفة ويطبع كرت صغير لكل رول متاح للمستخدم */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {user.roles.map((role, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#EADCC9] text-[#594433] border border-[#D7C3AD]"
              >
                <FaUserShield className="mr-1 text-sm text-[#8C6D53]" /> 
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Profile Details (Label & Value) */}
        <div className="space-y-4">
          
          {/* Row 1: User ID */}
          <div className="flex flex-col space-y-1 p-3.5 bg-white bg-opacity-60 rounded-2xl border border-[#EFE7DC] shadow-sm">
            <span className="text-xs font-bold text-[#A68B75] uppercase tracking-wider flex items-center gap-1.5">
              <FaIdCard className="text-sm" /> User Identifier
            </span>
            <span className="text-sm font-semibold text-[#594433] font-mono select-all bg-[#F5ECE1] px-2 py-0.5 rounded w-fit">
              {user.id}
            </span>
          </div>

          {/* Row 2: Email Address */}
          <div className="flex flex-col space-y-1 p-3.5 bg-white bg-opacity-60 rounded-2xl border border-[#EFE7DC] shadow-sm">
            <span className="text-xs font-bold text-[#A68B75] uppercase tracking-wider flex items-center gap-1.5">
              <FaEnvelope className="text-sm" /> Email Address
            </span>
            <span className="text-sm font-semibold text-[#594433]">
              {user.email}
            </span>
          </div>

          {/* Row 3: Phone Number */}
          <div className="flex flex-col space-y-1 p-3.5 bg-white bg-opacity-60 rounded-2xl border border-[#EFE7DC] shadow-sm">
            <span className="text-xs font-bold text-[#A68B75] uppercase tracking-wider flex items-center gap-1.5">
              <FaPhone className="text-sm" /> Phone Number
            </span>
            <span className="text-sm font-semibold text-[#594433] font-sans">
              {user.phoneNumber}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;