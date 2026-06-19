import { FaTrash, FaEdit } from "react-icons/fa";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { Children, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PageHeader from "./PageHeader";
import ReusableTable from "./ReusableTable";
import CustomerForm from "../Components/CustomerForm";
import ProductForm from "../Components/ProductForm";
import OrderForm from "../Components/OrderForm";

const ManageOrders = ({ actions }) => {
  const {orders, products, customers, shippings} = useLoaderData(); // Load customers data using the loader
  const [selectedIds, setSelectedIds] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(null);

  const revalidator = useRevalidator();

  const selectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    if (orders.length === 0) return;

    if (selectedIds.length === orders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map((order) => order.id));
    }
  };

  const isAnySelected = selectedIds.length > 0;

  const onDeleteClick = async (ids) => {
    try {
      setLoading(true); // Start loading before deletion

      await actions.delete(ids, "orders"); // Call the delete function from App.jsx

      revalidator.revalidate(); // Revalidate to refresh the customers list

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
      await onDeleteClick(ids, "items");
    }
  };

  const formattedOrdersList = orders.map((order) => ({
    ...order,
    orderDateFormatted: new Date(order.orderDate).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  }));

  const columns = [
    { label: "OrderNumber", key: "orderNumber" },
    { label: "OrderDate", key: "orderDateFormatted" },
    { label: "OrderStatus", key: "orderStatus" },
    { label: "CustomerName", key: "customerName" },
    { label: "Carrier", key: "carrier" },
    { label: "Total", key: "total" },
    { label: "Items", key: "items", nested: true ,
        children:
        [
            { label: "Product", key: "itemName" },
            { label: "Quantity", key: "quantity" },
            { label: "Price", key: "price" },
        ]
     },
  ];

  return (
    <>
      {showAdd ? (
        <OrderForm
          orderData={null}
          products={products}
          customers={customers}
          shippings={shippings}
          onSave={actions.add}
          onClose={() => setShowAdd(false)}
          revalidate={revalidator.revalidate}
        />
      ) : showUpdate ? (
        <OrderForm
          key={showUpdate.id}
          orderData={showUpdate}
          products={products}
          customers={customers}
          shippings={shippings}
          onSave={actions.update}
          onClose={() => setShowUpdate(null)}
          revalidate={revalidator.revalidate}
        />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <PageHeader
            title="Orders"
            onAdd={() => setShowAdd(true)}
            onDelete={() => confirmDelete(selectedIds)}
            isAnySelected={isAnySelected}
            loading={loading}
          />

          <ReusableTable
            columns={columns}
            data={formattedOrdersList}
            selectedIds={selectedIds}
            onSelectOne={selectOne}
            onSelectAll={selectAll}
            renderActions={(order) => (
              <div className="flex justify-end gap-2">
                <button
                  className="p-1 md:p-2 text-blue-600 hover:bg-blue-100 rounded-md transition"
                  title="Edit"
                  onClick={() => setShowUpdate(order)}
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
                  onClick={() => confirmDelete([order.id])}
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

export default ManageOrders;
