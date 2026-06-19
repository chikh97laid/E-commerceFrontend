const Categories = async () => {
  const response = await fetch("/api/categories");

  if (!response.ok)
    throw new Response("Could not fetch categories", {
      status: response.status,
    });

  return response.json();
};
export default Categories;
