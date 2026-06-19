import React from "react";

const Payments = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/payments", {
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
