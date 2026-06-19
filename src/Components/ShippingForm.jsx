import { useState } from "react";
import { toast } from "react-toastify";

const ShippingForm = ({ shippingData, onSave, onClose, revalidate }) => {

  const [carrier, setCarrier] = useState(shippingData?.carrier || "");

  const isEdit = Boolean(shippingData);

  const carriers = [ "DHL", "FedEx", "UPS"];

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      carrier: carrier,
    };

    if (isEdit) {
      await onSave({ ...dataToSend, id: shippingData?.id }, "shippings");
    } else {
      await onSave(dataToSend, "shippings");
    }

    revalidate();
    toast.success(
      isEdit ? "Shipping Updated successfully" : "Shipping Added successfully",
    );
    onClose();
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <button
        className="absolute top-4 left-6 text-xl fa-bold text-red-600 hover:text-gray-600 transition-colors p-2"
        onClick={onClose}
        aria-label="Go back"
      >
        ← <span className="hidden md:inline">Back</span>
      </button>
      <div className="bg-indigo-50 rounded-xl w-full md:w-2/3 m-auto">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl text-center font-semibold mb-6">
              {isEdit ? "Edit Shipping" : "Add New Shipping"}
            </h2>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="carrier"
              >
                Carrier
              </label>
              <select
                id="carrier"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500 bg-white"
                value={carrier}
                onChange={(e) => {
                  setCarrier(e.target.value);
                }}
                required
              >
                <option value="">Select a carrier</option>
                {carriers.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </select>
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

export default ShippingForm;
