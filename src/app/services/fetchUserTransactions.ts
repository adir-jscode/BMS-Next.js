export const fetchUserTransactions = async (token: string | null) => {
    if (!token) {
      console.error("No token found. User is not authenticated.");
      return [];
    }
  
    try {
      const response = await fetch("http://localhost:5000/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return []; // Return an empty array on failure
    }
  };
  