import React from "react";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaTruck,
  FaDollarSign,
  FaChartLine,
  FaClock,
  FaMapMarker,
} from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const StatisticsDashboard = () => {
  const {
    statsData,
    recentOrders,
    statusCounts,
    lowStockProducts,
    reviewsSummary,
  } = useLoaderData();

  const statusData = statusCounts || {
    pending: 0,
    processing: 0,
    delivered: 0,
    cancelled: 0,
  };

  const orders = recentOrders || [
    { id: "1001", customer: "Ahmed", status: "Pending", amount: 250 },
    { id: "1002", customer: "Ali", status: "Delivered", amount: 120 },
    { id: "1003", customer: "Sara", status: "Processing", amount: 80 },
  ];

  const data = statsData || {
    totalProducts: 120,
    totalOrders: 45,
    totalCustomers: 88,
    totalShippings: 12,
    totalRevenue: 2450,
  };

  const cards = [
    {
      title: "Total Products",
      value: data.totalProducts,
      icon: <FaBox className="text-blue-500 text-2xl" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: <FaShoppingCart className="text-amber-500 text-2xl" />,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      title: "Customers",
      value: data.totalCustomers,
      icon: <FaUsers className="text-emerald-500 text-2xl" />,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      title: "Active Shippings",
      value: data.totalShippings,
      icon: <FaTruck className="text-indigo-500 text-2xl" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      title: "Total Revenue",
      value: `$${data.totalRevenue}`,
      icon: <FaDollarSign className="text-purple-500 text-2xl" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* عنوان التبويب متناسق مع PageHeader الخاص بك */}
      <div className="border-l-4 border-indigo-500 pl-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 mt-1">
          Real-time platform statistics
        </p>
      </div>

      {/* شبكة الكروت (Stats Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm flex items-center justify-between transition hover:shadow-md"
          >
            <div className="space-y-1">
              <span className="text-sm font-medium text-gray-400 block uppercase tracking-wider">
                {card.title}
              </span>
              <span className="text-2xl font-bold text-gray-700">
                {card.value}
              </span>
            </div>
            <div
              className={`p-3 rounded-xl ${card.bgColor} border ${card.borderColor}`}
            >
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* قسم جدول الطلبات الأخيرة */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-2">
              <FaClock className="text-indigo-500" />
              <h3 className="font-bold text-blue-400">Recent Orders</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase text-gray-400 bg-gray-50">
                  <th className="px-6 py-3 font-semibold">Order ID</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 font-medium text-gray-700">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`py-1 px-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right font-bold text-gray-800">
                      ${order.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* بطاقة توزيع الحالات */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-bold text-blue-400 border-b border-gray-100 pb-3">
            Orders by Status
          </h3>

          <div className="space-y-3">
            {/* حالة المعلق */}
            <div className="flex justify-between items-center bg-amber-50/50 p-3 rounded-lg border border-amber-100">
              <span className="text-sm font-medium text-amber-800">
                Pending
              </span>
              <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs">
                {statusData.pending}
              </span>
            </div>

            {/* جاري المعالجة */}
            <div className="flex justify-between items-center bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              <span className="text-sm font-medium text-blue-800">
                Processing
              </span>
              <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-xs">
                {statusData.processing}
              </span>
            </div>

            {/* تم التوصيل */}
            <div className="flex justify-between items-center bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
              <span className="text-sm font-medium text-emerald-800">
                Delivered
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs">
                {statusData.delivered}
              </span>
            </div>

            {/* ملغي */}
            <div className="flex justify-between items-center bg-red-50/50 p-3 rounded-lg border border-red-100">
              <span className="text-sm font-medium text-red-800">
                Cancelled
              </span>
              <span className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full text-xs">
                {statusData.cancelled}
              </span>
            </div>
          </div>
        </div>
        {/* بطاقة تنبيهات نقص المخزون */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            <h3 className="font-bold text-blue-400">Low Stock Alerts</h3>
          </div>

          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                All products are well stocked!
              </p>
            ) : (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center bg-red-50/30 p-3 rounded-lg border border-red-100"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {product.name}
                  </span>
                  <span className="bg-rose-100 text-rose-700 font-bold px-2.5 py-1 rounded-md text-xs">
                    {product.quantity} left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        {/* بطاقة ملخص تقييمات العملاء */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <h3 className="font-bold text-blue-400 border-b border-gray-100 pb-3">
            Reviews Summary
          </h3>

          <div className="flex items-center justify-between bg-purple-50/40 p-4 rounded-xl border border-purple-100">
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider block">
                Average Rating
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-gray-800">
                  {reviewsSummary.averageRating}
                </span>
                <span className="text-amber-400 text-xl">⭐</span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider block">
                Total Reviews
              </span>
              <span className="text-2xl font-bold text-purple-700 block">
                {reviewsSummary.totalReviews}
              </span>
            </div>
          </div>

          {/* شريط مرئي يعبر عن قوة التقييم (Progress Bar) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-gray-500">
              <span>Satisfaction Rate</span>
              <span>{((reviewsSummary.averageRating / 5) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(reviewsSummary.averageRating / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
