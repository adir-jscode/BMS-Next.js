const Header = () => {
    return (
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to BMS</h1>
        <div className="space-x-4">
          <button className="btn btn-outline btn-info">Profile</button>
          <button className="btn btn-primary">Add Employee</button>
        </div>
      </header>
    );
  };
  
  export default Header;
  