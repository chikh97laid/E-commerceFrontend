import ProductCard from "../Components/ProductCard.jsx";
import { useLoaderData, useSubmit, useNavigation } from "react-router-dom";

// Function to fetch products

const productsLoader = async ({ request }) => {
  const url = new URL(request.url);

  const categoryId = url.searchParams.get("categoryId");

  let apiUrl = "api/items";

  if (categoryId) {
    apiUrl += `?categoryId=${categoryId}`;
  }

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Response("Could not fetch products", { status: response.status });
  }

  return response.json();
};

// Function to fetch categories (للقائمة المنسدلة)

const categoriesLoader = async () => {
  const response = await fetch("/api/categories");

  if (!response.ok) throw new Response("Could not fetch categories", { status: response.status });

  return response.json();
};

const ProductsPage = () => {
  const { products, categories } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();

  // الحصول على التصنيف الحالي من الرابط ليبقى الـ Select متزامناً
  const queryParams = new URLSearchParams(window.location.search);
  const currentCategory = queryParams.get("categoryId") || "";

  const handleFilterChange = (event) => {
    // هذه الدالة ستقوم بتحديث الرابط تلقائياً وإعادة تشغيل الـ Loader
    submit(event.currentTarget.form);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl text-indigo-600 font-bold">Our Products</h1>

        {/* نموذج الفلترة - التغيير هنا يرسل طلب GET للرابط الحالي */}
        <form method="get">
          <select 
            name="categoryId"
            value={currentCategory}
            onChange={handleFilterChange}
            className="p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </form>
      </div>

      {/* عرض حالة التحميل أثناء جلب البيانات الجديدة عند الفلترة */}
      {navigation.state === "loading" ? (
        <div className="text-center py-20 text-xl font-bold text-indigo-600">loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export {ProductsPage as default, productsLoader, categoriesLoader};
