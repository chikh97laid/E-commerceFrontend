import { useState } from "react";
import { toast } from "react-toastify";

const PaymentForm = ({ paymentData, orders, onSave, onClose, revalidate }) => {

  const [method, setMethod] = useState(paymentData?.method || "");
  const [orderId, setOrderId] = useState(paymentData?.orderId || "");
  const [orderNumber, setOrderNumber] = useState(paymentData?.orderNumber || "");

  const isEdit = Boolean(paymentData);

  const PaymentMethods = [ "paypal", "stripe", "cash"];
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      method: method,
      orderId: orderId,
    };

    if (isEdit) {
      await onSave({ ...dataToSend, id: paymentData?.id }, "payments");
    } else {
      await onSave(dataToSend, "payments");
    }

    revalidate();
    toast.success(
      isEdit ? "Payment Updated successfully" : "Payment Added successfully",
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
              {isEdit ? "Edit Payment" : "Add New Payment"}
            </h2>
            <datalist id="orders-list">
              {orders.map((order) => (
                <option key={order.id} value={order.orderNumber} />
              ))}
            </datalist>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="orderNumber"
              >
                Order Number
              </label>
              <input
                id="orderNumber"
                name="orderNumber"
                list="orders-list"
                autoComplete="off"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. ORD-xxxx-xxxx"
                required
                value={orderNumber}
                onChange={(e) => {
                  const value = e.target.value;

                  setOrderNumber(value);

                  const selectedOrder = orders.find(
                    (c) => c.orderNumber.toLowerCase() === value.toLowerCase(),
                  );

                  setOrderId(selectedOrder ? selectedOrder.id : "");
                }}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="method"
              >
                Method
              </label>
              <select
                id="method"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500 bg-white"
                value={method}
                onChange={(e) => {
                  setMethod(e.target.value);
                }}
                required
              >
                <option value="">Select a method</option>
                {PaymentMethods.map((method, index) => (
                  <option key={index} value={method}>
                    {method}
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

export default PaymentForm;
