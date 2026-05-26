import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    try {
      role = JSON.parse(atob(token.split(".")[1])).role;
    } catch (err) {
      console.log("Invalid token");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="navbar">
      
      {/* 🔥 Logo → Home */}
      <Link to="/" className="logo">
        RateShop.com
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>
        
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/add-store">Add Store</Link>
            <Link to="/admin/users">Users</Link>
          </>
        )}

        {role === "owner" && (
          <Link to="/owner">Owner</Link>
        )}

       <Link to="/stores">Stores</Link>

        {/* Logout */}
        {token && (
          <button onClick={logout}>Logout</button>
        )}

      </div>
    </div>
  );
}

export default Navbar;