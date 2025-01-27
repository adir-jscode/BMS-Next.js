// components/Sidebar.js

const Sidebar = () => {
    return (
      <aside className="w-64 bg-blue-900 text-white flex flex-col h-screen">
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold">BMS Dashboard</h2>
        </div>
        <nav className="flex-1 mt-4 space-y-2">
          <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-blue-700">
            Dashboard
          </a>
          <a href="/employees" className="block py-2 px-4 rounded hover:bg-blue-700">
            Employees
          </a>
          <a href="/transactions" className="block py-2 px-4 rounded hover:bg-blue-700">
            Transactions
          </a>
          <a href="/reports" className="block py-2 px-4 rounded hover:bg-blue-700">
            Reports
          </a>
          <a href="/settings" className="block py-2 px-4 rounded hover:bg-blue-700">
            Settings
          </a>
        </nav>
        <div className="p-4">
          <button className="btn btn-outline btn-error w-full">Logout</button>
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  