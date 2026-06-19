import { useState } from "react";
import { toast } from "react-toastify";

const CategoryFrom = ({ categoryData, onSave, onClose, revalidate }) => {
  const [name, setName] = useState(categoryData?.name || "");

  const isEdit = Boolean(categoryData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await onSave({ name: name, id: categoryData?.id }, "categories");
    } else {
      await onSave({ name: name }, "categories");
    }

    revalidate();
    toast.success(
      isEdit ? "Category Updated successfully" : "Category Added successfully",
    );
    onClose();
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <button 
      className="absolute top-4 left-6 text-xl fa-bold text-red-600 hover:text-gray-600 transition-colors p-2"
      onClick={onClose}>
        ← <span className="hidden md:inline">Back</span>
      </button>
      <div className="bg-indigo-50 rounded-xl w-full md:w-2/3 m-auto">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl text-center font-semibold mb-6">
              {isEdit ? "Edit Category" : "Add New Category"}
            </h2>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. Electronics"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full w-full transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full transition"
              >
                {isEdit ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryFrom;
