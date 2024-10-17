import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithPassword } from "../store/authSlice";
import { useNavigate } from "react-router-dom"; // If using react-router for navigation


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const { loading, error, isAuthenticated, userToken } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      // Optionally, save the token to localStorage for persistence
      localStorage.setItem("token", userToken);
      // Redirect to a protected route after login
      navigate("/dashboard"); // Replace with your desired route
    }
  }, [isAuthenticated, navigate, userToken]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginWithPassword({ email, password }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Add validation
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Add validation
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error.error}</p>}
    </div>
  );
};

export default Login;
