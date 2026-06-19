// Function to fetch orders
const Orders = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Response("Could not fetch orders", {
      status: response.status,
    });

  return response.json();
};

export default Orders;
