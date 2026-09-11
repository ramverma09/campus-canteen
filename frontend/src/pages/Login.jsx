import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log({
      email,
      password
    });

    alert("Login successful!");

    navigate("/menu");

  };

  return (
    <>
      <Navbar />

      <div className="form-container">

        <h2>Student Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
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
              placeholder="Enter password"
              required
            />

          </div>

          <button className="btn" type="submit">
            Login
          </button>

        </form>

        <div className="form-footer">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>
    </>
  );
}

export default Login;