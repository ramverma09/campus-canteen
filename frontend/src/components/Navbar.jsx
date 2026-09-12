import { Link } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        🍔 Campus Canteen
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/menu">
          Menu
        </Link>

        <Link to="/cart">
          Cart 🛒
        </Link>

        <Link to="/orders">
          My Orders
        </Link>

        {user?.role === "admin" && (
          <>
            <Link to="/admin">
              Admin Dashboard
            </Link>

            <Link to="/admin/orders">
              Admin Orders
            </Link>
          </>
        )}

        {user ? (
          <button
            onClick={logout}
            className="nav-logout"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;