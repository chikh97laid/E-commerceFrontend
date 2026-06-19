import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // أي طلب يبدأ بـ /api سيتم توجيهه لسيرفر الـ .NET
      "/api": {
        target: "https://localhost:7276", // استبدله برابط الـ API الخاص بك
        changeOrigin: true,
        secure: false, // مهم جداً لتجاوز مشاكل شهادة الـ SSL في بيئة التطوير
        // rewrite: (path) => path.replace(/^\/api/, ''), // أضف هذا السطر فقط إذا كان الـ Controller لا يبدأ بكلمة api
      },
      "/uploads": {
        target: "https://localhost:7276",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
