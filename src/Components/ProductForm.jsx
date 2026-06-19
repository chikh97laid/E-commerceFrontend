import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductForm = ({
  productData,
  categoriesList,
  onSave,
  onClose,
  revalidate,
}) => {
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || "",
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [image, setImage] = useState(productData?.imageUrl || null);
  const [categoryId, setCategoryId] = useState(productData?.categoryId || "");
  const [preview, setPreview] = useState(null);

  // useEffect to update the preview when the image changes
  useEffect(() => {
    // Clean up the preview when the component unmounts
    return () => {
      if (preview) { // check if preview is not null
        URL.revokeObjectURL(preview); // revoke the object URL
      }
    };
  }, [preview]);  // this will run when the component unmounts

  // Function to handle file change
  const handleFileChange = (file) => {
    if (file) {
      setImage(file); 

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const isEdit = Boolean(productData);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: name,
      description: description,
      price: price ? parseFloat(price) : 0,
      quantity: quantity ? parseInt(quantity) : 0,
      categoryId: categoryId ? parseInt(categoryId) : null,
      image: image,
    };

    if (isEdit) {
      await onSave({ ...dataToSend, id: productData?.id }, "items", {useFormData: true});
    } else {
      await onSave(dataToSend, "items");
    }

    revalidate();
    toast.success("Product Added successfully");
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
              {isEdit ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                rows="4"
                placeholder="Add a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="price"
              >
                Price($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. 9999.99"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                placeholder="eg. 10"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500 bg-white"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>

              {(preview ?? image) && (
                <img
                  src={preview ?? image}
                  alt="Selected"
                  className="w-20 h-20 mb-2 rounded"
                />
              )}

              <input
                type="file"
                id="image"
                name="image"
                className="border rounded w-full py-2 px-3 focus:outline-indigo-500"
                onChange={(e) => {
                  handleFileChange(e.target.files[0]);
                }}
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

export default ProductForm;
