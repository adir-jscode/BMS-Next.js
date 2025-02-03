import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
const Header = () => {
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
    return (
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to BMS</h1>
        <div className="space-x-4">
          <button className="btn btn-outline btn-info">Profile</button>
          {/* <button className="btn btn-primary">Add Employee</button> */}
          
        <button onClick={handleLogout} className="btn  btn-error">
        <LogOut size={20} /> Logout
        </button>
    
        </div>
      </header>
    );
  };
  
  export default Header;
  