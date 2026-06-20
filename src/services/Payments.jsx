import React from "react";
import API_URL from "./API_URL.jsx"; // استيراد رابط الـ API من ملف منفصل

const Payments = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Response("Could not fetch payments", {
      status: response.status,
    });

  return response.json();
};

export default Payments;
