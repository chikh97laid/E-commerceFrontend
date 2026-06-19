import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  // تفكيك الخصائص من الكائن القادم من الـ API
  const {
    id,
    name,
    description,
    price,
    imageUrl,
    quantity,
    averageRating,
    reviewsCount,
  } = product;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* عرض الصورة مع معالجة حالة عدم وجودها */}
      <div className="relative h-48 w-full bg-white">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt={name}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
        {/* ملصق في حال نفاد الكمية */}
        {quantity <= 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
        <p className="text-gray-600 text-sm mt-1 h-10 line-clamp-2">
          {description}
        </p>

        {averageRating > 0 && (
          <div className="flex items-center gap-1 text-yellow-400 text-lg mt-2">
            {"★".repeat(Math.round(averageRating))}
            {"☆".repeat(5 - Math.round(averageRating))}
            <span className="text-gray-500 text-xs ml-2">({reviewsCount})</span>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-semibold text-indigo-600">
            ${price.toFixed(2)}
          </span>

          <div className="flex space-x-2">
            {/* زر عرض التفاصيل */}
            <Link
              to={`/products/${id}`}
              className="text-gray-500 hover:text-indigo-600 p-2"
            >
              Details
            </Link>

            {/* زر الإضافة للسلة */}
            <button
              disabled={quantity <= 0}
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
