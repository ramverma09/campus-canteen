import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await API.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            const { token, user } =
                response.data;

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            alert("Login successful!");

            navigate("/menu");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {
            setLoading(false);
        }
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
                            placeholder="Enter email"
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

                    <button
                        type="submit"
                        className="btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                <div className="form-footer">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>

                </div>

            </div>
        </>
    );
}

export default Login;