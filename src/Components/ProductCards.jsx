import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import API_URL from "../services/API_URL.jsx"; // استيراد رابط الـ API من ملف منفصل

const ProductCards = ({ isHome = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = `${API_URL}/api/items`; // استخدم رابط الـ API من ملف منفصل

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  let displayProducts = isHome ? products.slice(0, 3) : products;
  
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-indigo-500 mb-6 text-center">
          Featured Products
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      {isHome && (
      <div className="mx-auto max-w-lg px-2 sm:px-6 lg:px-8 mt-10 text-center">
        <Link
          to="/products"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Products
        </Link>
      </div>)}
    </section>
  );
};

export default ProductCards;
