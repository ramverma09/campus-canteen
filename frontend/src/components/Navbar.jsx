import { Link } from "react-router-dom";

function Navbar() {
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

        <Link to="/login">
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;