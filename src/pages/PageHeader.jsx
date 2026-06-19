import React from "react";
import { FaTrash } from "react-icons/fa";

const PageHeader = ({ title, onAdd, onDelete, isAnySelected, loading }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <h2 className="text-2xl font-bold text-blue-400 md:border-l-4 border-blue-400 pl-4">
        {title}
      </h2>

      <div className="flex-col md:flex-row flex items-center gap-3">
        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 
                    transition shadow-md shadow-indigo-100"
          onClick={onAdd}
        >
          <span className="text-lg font-bold">+</span>
          <span>Add Customer</span>
        </button>
        <button
          disabled={!isAnySelected || loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${
              isAnySelected
                ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
         `}
          onClick={onDelete}
        >
          <FaTrash />
          <span>Delete Selected</span>
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
