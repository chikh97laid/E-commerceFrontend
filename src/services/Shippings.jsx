// Function to fetch shippings
const Shippings = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/shippings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Response("Could not fetch shippings", {
      status: response.status,
    });

  return response.json();
};

export default Shippings;
