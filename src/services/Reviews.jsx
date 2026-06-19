// Function to fetch reviews
const Reviews = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/reviews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok)
    throw new Response("Could not fetch reviews", {
      status: response.status,
    });

  return response.json();
};

export default Reviews;
