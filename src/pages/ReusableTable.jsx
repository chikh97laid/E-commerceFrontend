import React, { useState } from "react";

// Components/Common/ReusableTable.jsx
const ReusableTable = ({
  columns,
  data,
  selectedIds,
  onSelectOne,
  onSelectAll,
  renderActions,
}) => {
  const isImagePath = (path) => {
    if (!path || typeof path !== "string") return false;
    const extensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
    const fileExt = path.split(".").pop().toLowerCase();
    return extensions.includes(fileExt);
  };

  const [selectedItems, setSelectedItems] = useState(null); // State to hold selected items for nested view

  return (
    <div className="overflow-auto h-96">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-t border-gray-200">
          <tr>
            <th className="px-6 py-4 w-10 border-l border-gray-150">
              <div className="pt-[6px]">
                <input
                  type="checkbox"
                  checked={
                    data.length > 0 && selectedIds.length === data.length
                  }
                  onChange={onSelectAll}
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
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-indigo-50/30  border-l border-r border-gray-150"
            >
              <td className="px-6 py-4  border-b">
                <div className="pt-[6px]">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => onSelectOne(item.id)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                </div>
              </td>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-6 py-4 font-medium text-gray-700 border-l border-b border-gray-150"
                >
                  {col.nested ? (
                    <button
                      onClick={() => setSelectedItems(item[col.key])} // item.items is the array
                      className="text-indigo-600 hover:text-indigo-900 font-bold underline"
                    >
                      View ({item[col.key]?.length || 0}) Items
                    </button>
                  ) : isImagePath(item[col.key]) ? (
                    <img
                      src={item[col.key]}
                      alt=""
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    item[col.key]
                  )}
                </td>
              ))}
              <td className="px-6 py-4 text-right  border-l border-b border-gray-150">
                {renderActions(item)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Overlay */}
      {selectedItems && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          {/* Modal Content */}
          <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-2/3 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-indigo-50">
              <h3 className="text-xl font-bold text-gray-800">
                Order Items Details
              </h3>
              <button
                onClick={() => setSelectedItems(null)}
                className="text-gray-500 hover:text-red-600 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {columns.map(col => col.nested && (
                      col.children.map(childCol => (
                        <th key={childCol.key} className="p-3 border">
                          {childCol.label}
                        </th>
                      ))                                                              
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((child, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-3 border">{child.itemName}</td>
                      <td className="p-3 border">{child.quantity}</td>
                      <td className="p-3 border">${child.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-gray-50 text-right">
              <button
                onClick={() => setSelectedItems(null)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableTable;
