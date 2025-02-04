// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCustomer = async (id: number, customerData: any, token: string | null) => {
    const res = await fetch(`http://localhost:5000/customers/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    if (!res.ok) throw new Error("Failed to update customer");
    return res.json();
  };