import { useState } from "react";
import { toast } from "react-toastify";

const OrderForm = ({
  orderData,
  products,
  customers,
  shippings,
  onSave,
  onClose,
  revalidate,
}) => {
  const [customerName, setCustomerName] = useState(
    orderData?.customerName || "",
  );
  const [customerId, setCustomerId] = useState(orderData?.customerId || "");

  const [carrierId, setCarrierId] = useState(orderData?.shippingId || "");

  // 1. Change initial state to an array
  const [items, setItems] = useState(
    orderData?.items?.map((item) => ({
      ...item,
      rowId: crypto.randomUUID(), // Add a unique rowId for each item
    })) || [],
  );

  // 2. Add a function to handle adding a new item row
  const addItem = () => {
    setItems([
      ...items,
      { rowId: crypto.randomUUID(), itemId: "", itemName: "", quantity: 1 },
    ]);
  };

  // 3. Add a function to update a specific item in the array
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const isEdit = Boolean(orderData);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerId) {
      toast.error("Please select a valid customer");
      return;
    }

    if (!carrierId) {
      toast.error("Please select a carrier");
      return;
    }

    if (items.length === 0) {
      toast.error("Add at least one item");
      return;
    }

    const invalidItems = items.some(
      (item) => !item.itemId || !item.quantity || item.quantity <= 0,
    );

    if (invalidItems) {
      toast.error("Please fill all items correctly");
      return;
    }

    const dataToSend = {
      customerId: customerId,
      shippingId: carrierId,
      items: items,
    };

    if (isEdit) {
      await onSave({ ...dataToSend, id: orderData?.id }, "orders");
    } else {
      await onSave(dataToSend, "orders");
    }

    revalidate();
    toast.success(
      isEdit ? "Order Updated successfully" : "Order Added successfully",
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
              {isEdit ? "Edit Order" : "Add New Order"}
            </h2>
            <datalist id="customers-list">
              {customers.map((customer) => (
                <option key={customer.id} value={customer.name} />
              ))}
            </datalist>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="customerName"
              >
                Customer Name
              </label>
              <input
                id="customerName"
                name="customerName"
                list="customers-list"
                autoComplete="off"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. John Doe"
                required
                value={customerName}
                onChange={(e) => {
                  const value = e.target.value;

                  setCustomerName(value);

                  const selectedCustomer = customers.find(
                    (c) => c.name.toLowerCase() === value.toLowerCase(),
                  );

                  setCustomerId(selectedCustomer ? selectedCustomer.id : "");
                }}
              />
            </div>
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
                value={carrierId}
                onChange={(e) => {
                  setCarrierId(e.target.value);
                }}
                required
              >
                <option value="">Select a category</option>
                {shippings.map((carrier) => (
                  <option key={carrier.id} value={carrier.id}>
                    {carrier.carrier}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 font-bold">Order Items</label>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-200"
                >
                  + Add Item
                </button>
              </div>
              <datalist id="products-list">
                {products.map((product) => (
                  <option key={product.id} value={product.name} />
                ))}
              </datalist>
              {items.map((item, index) => (
                <div
                  key={item.rowId} // Use rowId for the key
                  className="flex gap-2 mb-2 bg-white p-2 rounded shadow-sm"
                >
                  <input
                    placeholder="Product Name"
                    className="border p-2 rounded w-full"
                    list="products-list" // <--- This ID must match the datalist ID!
                    autoComplete="off"
                    value={item.itemName}
                    onChange={(e) => {
                      const value = e.target.value;

                      const selectedProduct = products.find(
                        (p) => p.name.toLowerCase() === value.toLowerCase(),
                      );

                      updateItem(index, "itemName", value);
                      updateItem(index, "itemId", selectedProduct?.id || "");
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    className="border p-2 rounded w-20"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setItems(
                        items.filter(
                          (currentItem) => currentItem.rowId !== item.rowId,
                        ),
                      )
                    }
                    className="text-red-500 px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
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

export default OrderForm;
