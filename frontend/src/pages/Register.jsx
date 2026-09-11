import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Registration Data:", formData);

    alert("Registration form submitted!");

  };

  return (
    <>
      <Navbar />

      <div className="form-container">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
            />

          </div>

          <button className="btn" type="submit">
            Register
          </button>

        </form>

        <div className="form-footer">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>
    </>
  );
}

export default Register;