import { useLoaderData } from "react-router-dom";

const ProductPage = () => {
  const product = useLoaderData();
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* 1. قسم الصور */}
      <div className="rounded-2xl overflow-hidden bg-gray-100 p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* 2. قسم التفاصيل */}
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            {product.name}
          </h1>
        </div>

        <div className="text-2xl font-bold text-green-600">
          ${product.price}
        </div>

        <p className="text-gray-600 leading-relaxed">{product.description}</p>

        {/* أزرار التحكم */}
        <div className="flex items-center space-x-4">
          <div className="flex border rounded-lg">
            <button className="px-4 py-2 border-r">-</button>
            <span className="px-6 py-2">1</span>
            <button className="px-4 py-2 border-l">+</button>
          </div>
          <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
            Add to Cart
          </button>
        </div>

        {/* معلومات الشحن (استخدم التي برمجتها سابقاً) */}
        <div className="border-t pt-6 text-sm text-gray-500 space-y-2">
          <p>✅ Free Shipping on orders over $100</p>
          <p>🔄 14 days return policy</p>
        </div>
      </div>
    </div>
  );
};

const ProductLoader = async ({ params }) => {
  try {
    const res = await fetch(`/api/items/${params.id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch product data");
  }
};

export { ProductPage as default, ProductLoader };
