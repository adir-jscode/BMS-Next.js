// components/Sidebar.js
"use client";

import { useRouter } from "next/navigation";

const Sidebar = () => {

  const router = useRouter();
  

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "GET",
        credentials: "include", 
      });

      if (response.ok) {
        router.push("/login"); 
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/employee-dashboard" },
    { name: "Employees", link: "/employees" },
    { name: "Transactions", link: "/transactions" },
    { name: "Reports", link: "/reports" },
    { name: "Settings", link: "/settings" },
  ]
    return (
      <aside className="w-64 bg-blue-900 text-white flex flex-col h-screen">
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold">BMS Dashboard</h2>
        </div>
        <nav className="flex-1 space-y-4 p-2">
          {navItems.map((item, index) => (
            <a key={index} href={item.link} className="block p-2 hover:bg-blue-800">
              {item.name}
            </a>
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
  