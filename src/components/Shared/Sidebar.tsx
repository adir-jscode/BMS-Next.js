"use client";

import { useRouter } from "next/navigation";
// import Link from "next/link";
import Swal from "sweetalert2";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
}

const Sidebar = ({ setActiveComponent }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          text: "Have a great day...",
          timer: 1500,
          showConfirmButton: true,
        }).then(() => {
          router.push("/login"); // Redirect to login page
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: data.message || "An unexpected error occurred.",
        });
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = [
    { name: "Home", component: "Home" },
    { name: "Dashboard", component: "Dashboard" },
    { name: "Customers", component: "Customers" },
    { name: "Transactions", component: "Transactions" },
    { name: "Reports", component: "Reports" },
    { name: "Settings", component: "Settings" },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">BMS Dashboard</h2>
      </div>
      <nav className="flex-1 space-y-4 p-2">
      {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveComponent(item.component)}
            className="block w-full text-left p-2 hover:bg-blue-800"
          >
            {item.name}
          </button>
        ))}
      </nav>
      <div className="p-4">
        <button onClick={handleLogout} className="btn btn-outline btn-error w-full">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
