import { FaTrash, FaEdit } from "react-icons/fa";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PageHeader from "./PageHeader";
import ReusableTable from "./ReusableTable";
import PaymentForm from "../Components/PaymentForm";
import ShippingForm from "../Components/ShippingForm";

const ManageShippings = ({ actions }) => {
  const shippingsList = useLoaderData(); // Load categories data using the loader
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
    if (shippingsList.length === 0) return;

    if (selectedIds.length === shippingsList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(shippingsList.map((ship) => ship.id));
    }
  };

  const isAnySelected = selectedIds.length > 0;

  const onDeleteClick = async (ids) => {
    try {
      setLoading(true); // Start loading before deletion

      await actions.delete(ids, "shippings"); // Call the delete function from App.jsx

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
      await onDeleteClick(ids, "shippings");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    await actions.updateShippingStatus(id, status);
    revalidator.revalidate();
    toast.success("Shipping status updated successfully");
  };

  const columns = [
    { label: "Carrier", key: "carrier" },
    { label: "TrackingNumber", key: "trackingNumber" },
    { label: "ShippingStatus", key: "shippingStatus" },
  ];

  return (
    <>
      {showAdd ? (
        <ShippingForm
          shippingData={null}
          onSave={actions.add}
          onClose={() => setShowAdd(false)}
          revalidate={revalidator.revalidate}
        />
      ) : showUpdate ? (
        <ShippingForm
          key={showUpdate.id}
          shippingData={showUpdate}
          onSave={actions.update}
          onClose={() => setShowUpdate(null)}
          revalidate={revalidator.revalidate}
        />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <PageHeader
            title="Shippings"
            onAdd={() => setShowAdd(true)}
            onDelete={() => confirmDelete(selectedIds)}
            isAnySelected={isAnySelected}
            loading={loading}
          />

          <ReusableTable
            columns={columns}
            data={shippingsList}
            selectedIds={selectedIds}
            onSelectOne={selectOne}
            onSelectAll={selectAll}
            renderActions={(shipping) => (
              <div className="flex justify-end gap-2 items-center">
                <select
                  defaultValue={shipping.shippingStatus}
                  onChange={(e) =>
                    handleStatusUpdate(shipping.id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="Processing">Processing</option>
                  <option value="OutForDelivery">OutForDelivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="ReturnToSender">ReturnToSender</option>
                  <option value="OnHold">OnHold</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Lost">Lost</option>
                </select>

                <button
                  className="p-1 md:p-2 text-blue-600 hover:bg-blue-100 rounded-md transition"
                  title="Edit"
                  onClick={() => setShowUpdate(shipping)}
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
                  onClick={() => confirmDelete([shipping.id])}
                >
                  Delete
                </button>
              </div>
            )}
          />
        </div>
      )}
    </>
  );
};

export default ManageShippings;
