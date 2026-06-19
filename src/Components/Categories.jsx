import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [cats, setcats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categoryImages = {
    laptops: "./src/CategoryImages/laptops02.webp",
    phones: "./src/CategoryImages/phones.webp",
    watches: "./src/CategoryImages/watches.webp",
  };

  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      const apiUrl = "/api/categories";

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const allowedCategories = ["laptops", "phones", "watches"];

        const filteredCats = data.filter((cat) =>
          allowedCategories.includes(cat.name),
        );

        setcats(filteredCats);

        if (filteredCats.length > 0) {
          setActiveCategory(filteredCats[0]);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <section
      style={{
        backgroundImage: activeCategory
          ? `url(${categoryImages[activeCategory.name.toLowerCase()]})`
          : "none",
      }}
      className="relative w-full h-[500px] transition-all duration-700 bg-cover bg-center flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
        <div className="flex gap-6 justify-center z-10">
          {cats.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`w-24 h-24 rounded-full border-4 cursor-pointer transition-all duration-700 flex items-center justify-center text-white font-bold text-sm ${
                activeCategory?.id === cat.id
                  ? "border-indigo-500 scale-110"
                  : "border-white"
              }`}
              style={{
                backgroundImage: `url(${categoryImages[cat.name.toLowerCase()]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
        <button
          className="mt-10 bg-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-700 transition"
          onClick={() => {
            if (activeCategory) {
              navigate(`/products?categoryId=${activeCategory.id}`);
            }
          }}
        >
          Explore {activeCategory?.name}
        </button>
      </div>
    </section>
  );
};

export default Categories;
