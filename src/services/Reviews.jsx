import API_URL from "./API_URL.jsx"; // استيراد رابط الـ API من ملف منفصل

// Function to fetch reviews
const Reviews = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/reviews`, {
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
