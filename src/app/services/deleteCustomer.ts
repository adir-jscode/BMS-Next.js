export const deleteCustomer = async (id: number, token: string | null) => {
    const res = await fetch(`http://localhost:5000/customers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to delete customer");
  };