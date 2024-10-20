import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn, setFullName }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true); // Start loading

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password,
      });

      if (res.status === 200 && res.data.message === "Login successful") {
        setIsLoggedIn(true);
        setFullName(`${res.data.user.firstname} ${res.data.user.lastname}`);

        if (res.data.role === "admin") {
          navigate(`/dashboard/${res.data.user.ID}`);
        } else {
          navigate(`/patientdashboard/${res.data.user.ID}`);
        }
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (err) {
      setErrorMessage("An error occurred during login.");
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <main>
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && (
          <p className="error" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <Link to="/forgot-password">Forgot My Password?</Link>
          </div>
          <div className="form-group">
            <button type="submit" disabled={loading}>
              {" "}
              {/* Disable if loading */}
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
