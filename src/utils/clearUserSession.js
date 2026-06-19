// src/utils/authUtils.js

export const clearUserSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiration");
  localStorage.removeItem("roles");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("phoneNumber");
};