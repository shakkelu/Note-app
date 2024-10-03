import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Ask for email, Step 2: Ask for password
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Step 1: Verify Email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/verify-email", { email });
      if (response.data.message === "Email verified successfully") {
        setStep(2); // Move to the password step
      }
    } catch (err) {
      console.error(err.response.data.error); // Handle error (e.g., show email not found)
    }
  };

  // Step 2: Submit Login with Password
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div>
      <h1>Login</h1>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Next"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}

      {error && <p>{error.error}</p>}
      {isAuthenticated && <p>Logged in successfully</p>}
    </div>
  );
};

export default Login;
