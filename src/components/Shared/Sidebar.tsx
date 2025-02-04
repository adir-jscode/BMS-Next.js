"use client";

import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, BarChart, LogOut } from "lucide-react"; // Import icons
import Swal from "sweetalert2";
import { useAuth } from "@/app/context/AuthContext";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
}

const Sidebar = ({ setActiveComponent }: SidebarProps) => {
  const router = useRouter();
  const{ user,logout } = useAuth();
  console.log("user",user);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      logout();

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
    { name: "Dashboard", component: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Customers", component: "Customers", icon: <Users size={20} /> },
    { name: "Accounts", component: "Accounts", icon: <CreditCard size={20} /> },
    { name: "Transactions", component: "Transactions", icon: <CreditCard size={20} /> },
    { name: "Loans", component: "Loans", icon: <CreditCard size={20} /> },
    { name: "Reports", component: "Reports", icon: <BarChart size={20} /> },
    
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col min-h-screen">
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">BMS Dashboard</h2>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveComponent(item.component)}
            className="flex items-center gap-3 w-full text-left p-2 hover:bg-blue-800 rounded-lg transition"
          >
            {item.icon} {item.name}
          </button>
        ))}
      </nav>
      {/* user's id */}
      <div className="p-4 mt-auto">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left p-2 bg-red-600 hover:bg-red-700 rounded-lg transition">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
