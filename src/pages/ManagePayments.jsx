import { FaTrash, FaEdit } from "react-icons/fa";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PageHeader from "./PageHeader";
import ReusableTable from "./ReusableTable";
import PaymentForm from "../Components/PaymentForm";

const ManagePayments = ({ actions }) => {
  const { paymentsList, orders } = useLoaderData(); // Load categories data using the loader
  const [selectedIds, setSelectedIds] = useState([]); // State to track selected category IDs
  const [loading, setLoading] = useState(false); // State to track loading status during deletion
  const [showAdd, setShowAdd] = useState(false); // State to control the visibility of the add form
  const [showUpdate, setShowUpdate] = useState(null); // State to control the visibility of the update form

  const revalidator = useRevalidator();

  const selectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    if (paymentsList.length === 0) return;

    if (selectedIds.length === paymentsList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paymentsList.map((pay) => pay.id));
    }
  };

  const isAnySelected = selectedIds.length > 0;

  const onDeleteClick = async (ids) => {
    try {
      setLoading(true); // Start loading before deletion

      await actions.delete(ids, "payments"); // Call the delete function from App.jsx

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
      await onDeleteClick(ids, "payments");
    }
  };

  const handleConfirm = async (id) => {
    const result = await Swal.fire({
      title: "Confirm payment?",
      text: "This will mark payment as paid and reduce stock quantity.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Confirm",
    });

    if (result.isConfirmed) {
      try {
        
        await actions.confirmPayment(id);

        revalidator.revalidate();

        toast.success("Payment confirmed successfully");
      } catch {
        toast.error("Failed to confirm payment");
      }
    }
  };

  const formattedPaymentsList = paymentsList.map((payment) => ({
    ...payment,
    timeStampFormatted: new Date(payment.timeStamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  }));

  const columns = [
    { label: "Amount", key: "amount" },
    { label: "Method", key: "method" },
    { label: "TimeStamp", key: "timeStampFormatted" },
    { label: "Status", key: "paymentStatus" },
    { label: "OrderNumber", key: "orderNumber" },
  ];

  return (
    <>
      {showAdd ? (
        <PaymentForm
          paymentData={null}
          orders={orders}
          onSave={actions.add}
          onClose={() => setShowAdd(false)}
          revalidate={revalidator.revalidate}
        />
      ) : showUpdate ? (
        <PaymentForm
          key={showUpdate.id}
          paymentData={showUpdate}
          orders={orders}
          onSave={actions.update}
          onClose={() => setShowUpdate(null)}
          revalidate={revalidator.revalidate}
        />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <PageHeader
            title="Payments"
            onAdd={() => setShowAdd(true)}
            onDelete={() => confirmDelete(selectedIds)}
            isAnySelected={isAnySelected}
            loading={loading}
          />

          <ReusableTable
            columns={columns}
            data={formattedPaymentsList}
            selectedIds={selectedIds}
            onSelectOne={selectOne}
            onSelectAll={selectAll}
            renderActions={(payment) => (
              <div className="flex justify-end gap-2">
                <button
                  className="p-1 md:p-2 text-blue-600 hover:bg-blue-100 rounded-md transition"
                  title="Edit"
                  onClick={() => setShowUpdate(payment)}
                >
                  Edit
                </button>
                <button
                  className={`p-1 md:p-2 rounded-md transition
                          ${
                            loading
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-500 hover:bg-red-100"
                          }
                      `}
                  title="Delete"
                  onClick={() => confirmDelete([payment.id])}
                >
                  Delete
                </button>
                {payment.paymentStatus !== "Paid" && (
                  <button
                    className={`p-1 md:p-2 rounded-md transition
                      ${
                        loading
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-green-600 hover:bg-green-100"
                      }
                    `}
                    title="Confirm"
                    onClick={() => handleConfirm(payment.id)}
                  >
                    Confirm
                  </button>
                )}
              </div>
            )}
          />
        </div>
      )}
    </>
  );
};

export default ManagePayments;
