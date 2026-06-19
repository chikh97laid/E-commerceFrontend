import { FaTrash, FaEdit } from "react-icons/fa";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PageHeader from "./PageHeader";
import ReusableTable from "./ReusableTable";
import CategoryFrom from "../Components/CategoryForm";

const ManageCategories = ({ actions }) => {
  const categoriesList = useLoaderData(); // Load categories data using the loader
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
    if (categoriesList.length === 0) return;

    if (selectedIds.length === categoriesList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categoriesList.map((cat) => cat.id));
    }
  };

  const isAnySelected = selectedIds.length > 0;

  const onDeleteClick = async (ids) => {
    try {
      setLoading(true); // Start loading before deletion

      await actions.delete(ids, "categories"); // Call the delete function from App.jsx

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
      await onDeleteClick(ids, "categories");
    }
  };

  const columns = [{ label: "Name", key: "name" }];

  return (
    <>
      {showAdd ? (
        <CategoryFrom
          categoryData={null}
          onSave={actions.add}
          onClose={() => setShowAdd(false)}
          revalidate={revalidator.revalidate}
        />
      ) : showUpdate ? (
        <CategoryFrom
          key={showUpdate.id}
          categoryData={showUpdate}
          onSave={actions.update}
          onClose={() => setShowUpdate(null)}
          revalidate={revalidator.revalidate}
        />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <PageHeader
            title="Categories"
            onAdd={() => setShowAdd(true)}
            onDelete={() => confirmDelete(selectedIds)}
            isAnySelected={isAnySelected}
            loading={loading}
          />

          <ReusableTable
            columns={columns}
            data={categoriesList}
            selectedIds={selectedIds}
            onSelectOne={selectOne}
            onSelectAll={selectAll}
            renderActions={(category) => (
              <div className="flex justify-end gap-2">
                <button
                  className="p-1 md:p-2 text-blue-600 hover:bg-blue-100 rounded-md transition"
                  title="Edit"
                  onClick={() => setShowUpdate(category)}
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
                  onClick={() => confirmDelete([category.id])}
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

export default ManageCategories;
