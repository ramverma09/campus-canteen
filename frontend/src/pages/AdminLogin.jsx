import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      email === "admin@canteen.com" &&
      password === "admin123"
    ) {

      navigate("/admin/dashboard");

    } else {

      alert("Invalid admin credentials!");

    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">

        <h2>Canteen Staff Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Admin email"
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Password"
              required
            />

          </div>

          <button
            className="btn"
            type="submit"
          >
            Admin Login
          </button>

        </form>

      </div>
    </>
  );
}

export default AdminLogin;