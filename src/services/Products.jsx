// Function to fetch products
const Products = async () => {
  const response = await fetch("/api/items");

  if (!response.ok)
    throw new Response("Could not fetch products", {
      status: response.status,
    });

  return response.json();
};

export default Products;
