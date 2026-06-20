import API_URL from "./API_URL.jsx"; // استيراد رابط الـ API من ملف منفصل

// Function to fetch products
const Products = async () => {
  const response = await fetch(`${API_URL}/api/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok)
    throw new Response("Could not fetch products", {
      status: response.status,
    });

  return response.json();
};

export default Products;
