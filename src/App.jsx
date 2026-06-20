import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProductsPage, {
  productsLoader,
  categoriesLoader,
} from "./pages/ProductsPage.jsx";
import ProductPage, { ProductLoader } from "./pages/ProductPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import { toast } from "react-toastify";
import ManageCategories from "./pages/ManageCategories.jsx";
import ManageProducts from "./pages/ManageProducts.jsx";
import ManageCustomers from "./pages/ManageCustomers.jsx";
import ManageOrders from "./pages/ManageOrders.jsx";
import Products from "./services/Products.jsx";
import Categories from "./services/Categories.jsx";
import Orders from "./services/Orders.jsx";
import Customers from "./services/Customers.jsx";
import Shippings from "./services/Shippings.jsx";
import Payments from "./services/Payments.jsx";
import ManagePayments from "./pages/ManagePayments.jsx";
import ManageShippings from "./pages/ManageShippings.jsx";
import Reviews from "./services/Reviews.jsx";
import ManageReviews from "./pages/ManageReviews.jsx";
import StatisticsDashboard from "./pages/StatisticsDashboard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { clearUserSession } from "./utils/clearUserSession.js";
import API_URL from "./services/API_URL.jsx"; // استيراد رابط الـ API من ملف منفصل



// Add function
// دالة الإضافة (Add)
const addTarget = async (data, name) => {
  const token = localStorage.getItem("token");
  try {
    let options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // إرسال التوكن أساسي
      },
    };

    if (data.image) {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      options.body = formData;
      // ملاحظة: مع FormData المتصفح يضع Content-Type تلقائياً مع الحدود (Boundaries)، لا تضعه يدوياً.
    } else {
      // ✅ الحل: ندمج التوكن القديم مع الـ Content-Type الجديد دون مسحه
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }

    const res = await fetch(`${API_URL}/api/${name}`, options);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Server responded with an error");
    }
    return res.json();
  } catch (error) {
    if (import.meta.env.DEV)
      console.error("Technical Error Detail:", error.message);
    toast.error(error.message || "Failed to add. Please try again.");
    throw error;
  }
};

// دالة التحديث (Update)
const updateTarget = async (data, name, options = {}) => {
  const token = localStorage.getItem("token"); // جلب التوكن
  try {
    let body;
    let headers = {
      Authorization: `Bearer ${token}`, // إدراج التوكن هنا
    };

    const useFormData = options.useFormData || false;

    if (useFormData) {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      }
      body = formData;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const res = await fetch(`${API_URL}/api/${name}/${data.id}`, {
      method: "PUT",
      headers, // تمرير الهيدرز التي تحتوي على التوكن والنوع
      body,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Server error");
    }

    return res.json();
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

// دالة الحذف (Delete)
const deleteTarget = async (ids, name) => {
  const token = localStorage.getItem("token"); // جلب التوكن
  try {
    const isSingle = ids.length === 1;
    const url = isSingle ? `${API_URL}/api/${name}/${ids[0]}` : `${API_URL} /api/${name}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // تمرير التوكن لحماية الحذف
        "Content-Type": "application/json",
      },
      body: isSingle ? null : JSON.stringify(ids),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Server responded with an error");
    }
    return true;
  } catch (error) {
    if (import.meta.env.DEV)
      console.error("Technical Error Detail:", error.message);
    toast.error(error.message || "Failed to delete. Please try again.");
    throw error;
  }
};

// دالة تأكيد الدفع (Confirm Payment)
const confirmPayment = async (id) => {
  const token = localStorage.getItem("token"); // جلب التوكن
  try {
    const res = await fetch(`${API_URL}/api/payments/${id}/confirm`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // لا تترك الفيتش بدون توكن للأدمن
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to confirm payment");
    }

    return data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

// دالة تحديث حالة الشحن (Update Shipping Status)
const UpdateShippingStatus = async (id, status) => {
  const token = localStorage.getItem("token"); // جلب التوكن
  try {
    const res = await fetch(`${API_URL}/api/shippings/${id}/status?Status=${status}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`, // حماية الـ Patch المسؤول عن الشحن
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update shipping status");
    }

    return data;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};

const actions = {
  add: addTarget,
  update: updateTarget,
  delete: deleteTarget,
  updateShippingStatus: UpdateShippingStatus,
  confirmPayment: confirmPayment,
};

// مكون الحماية: يمنع الدخول للداشبورد بدون توكن
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userRoles = localStorage.getItem("roles");
  const expiration = localStorage.getItem("expiration");

  // دالة فحص انتهاء الصلاحية
  const isTokenExpired = () => {
    if (!expiration) return true;
    const expireTime = new Date(expiration).getTime();
    const currentTime = new Date().getTime();
    return currentTime > expireTime;
  };

  // 1. تحقق من وجود التوكن والصلاحيات المطلوبة للوصول للداشبورد
  if (!token || !userRoles || !userRoles.includes("Admin")) {
    // إذا لم يوجد توكن أو الصلاحيات، يتم توجيهه لصفحة اللوجن
    return <Navigate to="/login" replace />;
  }

  // 2. تحقق مما إذا كان التوكن قد انتهى عمره
  if (isTokenExpired()) {
    // clear local storage and log out the user
    clearUserSession();

    setTimeout(() => {
      toast.warning("Your session has expired. Please login again.");
    }, 100);

    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* // Protected route for dashboard */}
        <Route
          path="/login"
          element={
            <LoginPage loggingIn={(islogIn) => setIsLoggedIn(islogIn)} />
          }
        />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <MainLayout
              islogIn={isLoggedIn}
              loggingIn={(islogIn) => setIsLoggedIn(islogIn)}
            />
          }
        >
          <Route index element={<HomePage />} />

          <Route path="profile" element={<ProfilePage />} />

          {/* products path and merged loader into one function */}
          <Route
            path="products"
            element={<ProductsPage />}
            loader={async (args) => {
              const [products, categories] = await Promise.all([
                productsLoader(args),
                categoriesLoader(),
              ]);
              return { products, categories };
            }}
            errorElement={<NotFoundPage />}
          />

          <Route
            path="products/:id"
            element={<ProductPage />}
            loader={ProductLoader}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* dashboard path */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<StatisticsDashboard />}
            loader={async () => {
              const [orders, products, customers, shippings, reviews] =
                await Promise.all([
                  Orders(),
                  Products(),
                  Customers(),
                  Shippings(),
                  Reviews(),
                ]);

              // Calculate total revenue by summing the total of each order
              const totalRevenue = orders.reduce(
                (sum, order) => sum + (order.total || 0),
                0,
              );

              // Get the 3 most recent orders
              const recentOrders = [...orders]
                .sort((a, b) => b.id - a.id)
                .slice(0, 3);

              // Calculate order status counts
              const statusCounts = {
                pending: orders.filter(
                  (order) =>
                    order.orderStatus === 0 || order.orderStatus === "Pending",
                ).length,
                processing: orders.filter(
                  (order) =>
                    order.orderStatus === 1 ||
                    order.orderStatus === "Processing",
                ).length,
                delivered: orders.filter(
                  (order) =>
                    order.orderStatus === 3 ||
                    order.orderStatus === "Delivered",
                ).length,
                cancelled: orders.filter(
                  (order) =>
                    order.orderStatus === 4 ||
                    order.orderStatus === "Cancelled",
                ).length,
              };

              // Get the 5 products with the lowest stock
              const lowStockProducts = products
                .filter((product) => product.quantity <= 5)
                .slice(0, 5);

              const totalReviews = reviews.length;
              const averageRating =
                totalReviews > 0
                  ? (
                      reviews.reduce(
                        (sum, r) => sum + (r.ratingScore || 0),
                        0,
                      ) / totalReviews
                    ).toFixed(1)
                  : 0;

              return {
                statsData: {
                  totalProducts: products.length,
                  totalOrders: orders.length,
                  totalCustomers: customers.length,
                  totalShippings: shippings.length,
                  totalRevenue,
                },
                recentOrders,
                statusCounts,
                lowStockProducts,
                reviewsSummary: {
                  totalReviews,
                  averageRating: Number(averageRating), // تحويله لرقم مجدداً
                },
              };
            }}
            errorElement={<NotFoundPage />}
          ></Route>
          <Route
            path="categories"
            element={<ManageCategories actions={actions} />}
            loader={Categories}
            errorElement={<NotFoundPage />}
          ></Route>
          <Route
            path="orders"
            element={<ManageOrders actions={actions} />}
            loader={async () => {
              const [orders, products, customers, shippings] =
                await Promise.all([
                  Orders(),
                  Products(),
                  Customers(),
                  Shippings(),
                ]);
              return { orders, products, customers, shippings };
            }}
            errorElement={<NotFoundPage />}
          ></Route>
          <Route
            path="customers"
            element={<ManageCustomers actions={actions} />}
            loader={Customers}
            errorElement={<NotFoundPage />}
          ></Route>
          <Route
            path="items"
            element={<ManageProducts actions={actions} />}
            loader={async (args) => {
              const [productsList, categoriesList] = await Promise.all([
                Products(args),
                Categories(),
              ]);
              return { productsList, categoriesList };
            }}
            errorElement={<NotFoundPage />}
          ></Route>
          <Route
            path="payments"
            element={<ManagePayments actions={actions} />}
            loader={async () => {
              const [paymentsList, orders] = await Promise.all([
                Payments(),
                Orders(),
              ]);
              return { paymentsList, orders };
            }}
            errorElement={<NotFoundPage />}
          ></Route>
          <Route
            path="shippings"
            element={<ManageShippings actions={actions} />}
            loader={Shippings}
            errorElement={<NotFoundPage />}
          ></Route>
          <Route
            path="reviews"
            element={<ManageReviews actions={actions} />}
            loader={Reviews}
            errorElement={<NotFoundPage />}
          ></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>,
    ),
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </>
  );
};

export default App;
