import { FaTrash, FaEdit } from "react-icons/fa";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PageHeader from "./PageHeader";
import ReusableTable from "./ReusableTable";
import PaymentForm from "../Components/PaymentForm";
import ShippingForm from "../Components/ShippingForm";

const ManageReviews = ({ actions }) => {
  const reviewsList = useLoaderData(); // Load categories data using the loader
  const [selectedIds, setSelectedIds] = useState([]); // State to track selected category IDs
  const [loading, setLoading] = useState(false); // State to track loading status during deletion

  const revalidator = useRevalidator();

  const selectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    if (reviewsList.length === 0) return;

    if (selectedIds.length === reviewsList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(reviewsList.map((rev) => rev.id));
    }
  };

  const onDeleteClick = async (ids) => {
    try {
      setLoading(true); // Start loading before deletion

      await actions.delete(ids, "reviews"); // Call the delete function from App.jsx

      revalidator.revalidate(); // Revalidate to refresh the categories list

      toast.success("Deleted successfully");

      setSelectedIds([]);
    } catch {
      toast.error("Failed to delete");
    } finally {
      setLoading(false); // Ensure loading is stopped even if there's an error
    }
  };

  const confirmDelete = async (ids) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await onDeleteClick(ids, "reviews");
    }
  };

  const formattedReviewsList = reviewsList.map((review) => ({
    ...review,
    timeStampFormatted: new Date(review.timeStamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  }));

  const columns = [
    { label: "ReviewText", key: "reviewText" },
    { label: "RatingScore", key: "ratingScore" },
    { label: "TimeStamp", key: "timeStampFormatted" },
    { label: "CustomerName", key: "customerName" },
    { label: "ItemName", key: "itemName" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-blue-400 md:border-l-4 border-blue-400 pl-4">
          Reviews
        </h2>

        <button
          disabled={selectedIds.length === 0 || loading}
          onClick={() => confirmDelete(selectedIds)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${
              selectedIds.length === 0 || loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
            }
         `}
        >
          <FaTrash />
          <span>Delete Selected</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto h-96">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-t border-gray-200">
            <tr>
              <th className="px-6 py-4 w-10 border-l border-gray-150">
                <div className="pt-[6px]">
                  <input
                    type="checkbox"
                    checked={
                      reviewsList.length > 0 &&
                      selectedIds.length === reviewsList.length
                    }
                    onChange={selectAll}
                    aria-label="Select all"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider border-l border-gray-150"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 pr-9 md:pl-6 md:pr-12 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right border-r border-l border-gray-150">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {formattedReviewsList.map((review) => (
              <tr
                key={review.id}
                className="hover:bg-indigo-50/30  border-l border-r border-gray-150"
              >
                <td className="px-6 py-4  border-b">
                  <div className="pt-[6px]">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(review.id)}
                      onChange={() => selectOne(review.id)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                  </div>
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 font-medium text-gray-700 border-l border-b border-gray-150"
                  >
                    {review[col.key]}
                  </td>
                ))}

                <td className="px-4 py-3 text-center border-l border-b border-gray-150">
                  <button
                    className={`p-1 md:p-2 rounded-md transition
                          ${
                            loading
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-500 hover:bg-red-100"
                          }
                      `}
                    title="Delete"
                    onClick={() => confirmDelete([review.id])}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {reviewsList.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReviews;
