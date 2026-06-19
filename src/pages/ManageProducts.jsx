import { FaTrash, FaEdit } from "react-icons/fa";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PageHeader from "./PageHeader";
import ReusableTable from "./ReusableTable";
import CustomerForm from "../Components/CustomerForm";
import ProductForm from "../Components/ProductForm";

const ManageProducts = ({ actions }) => {
  
  const {productsList, categoriesList} = useLoaderData();

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
    if (productsList.length === 0) return;

    if (selectedIds.length === productsList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(productsList.map((cust) => cust.id));
    }
  };

  const isAnySelected = selectedIds.length > 0;

  const onDeleteClick = async (ids) => {
    try {
      setLoading(true); // Start loading before deletion

      await actions.delete(ids, "items"); // Call the delete function from App.jsx

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

  const columns = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Price", key: "price" },
    { label: "Quantity", key: "quantity" },
    { label: "Image", key: "imageUrl" },
    { label: "Category", key: "categoryName" },
  ];

  return (
    <>
      {showAdd ? (
        <ProductForm
          productData={null}
          categoriesList={categoriesList}
          onSave={actions.add}
          onClose={() => setShowAdd(false)}
          revalidate={revalidator.revalidate}
        />
      ) : showUpdate ? (
        <ProductForm
          key={showUpdate.id}
          productData={showUpdate}
          categoriesList={categoriesList}
          onSave={actions.update}
          onClose={() => setShowUpdate(null)}
          revalidate={revalidator.revalidate}
        />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <PageHeader
            title="Products"
            onAdd={() => setShowAdd(true)}
            onDelete={() => confirmDelete(selectedIds)}
            isAnySelected={isAnySelected}
            loading={loading}
          />

          <ReusableTable
            columns={columns}
            data={productsList}
            selectedIds={selectedIds}
            onSelectOne={selectOne}
            onSelectAll={selectAll}
            renderActions={(product) => (
              <div className="flex justify-end gap-2">
                <button
                  className="p-1 md:p-2 text-blue-600 hover:bg-blue-100 rounded-md transition"
                  title="Edit"
                  onClick={() => setShowUpdate(product)}
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
                  onClick={() => confirmDelete([product.id])}
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

export default ManageProducts;
