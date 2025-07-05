import React, { useState } from "react";
import { useUser } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";  // ✅ Add useNavigate
import "./LoginPage.css"; 

const LoginPage = ({ onLogin }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) => user.id === id && user.password === password
    );

    if (matchedUser) {
      setUser(matchedUser);          // in-memory session
      onLogin();                     // mark logged in in App.jsx
      navigate("/main");            // ✅ go to MainPage route
    } else {
      alert("❌ Invalid ID or Password");
    }
  };

  return (
    <div className="login-page">
      <div id="login-box">
        <h1>🔐 Login</h1>

        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <Link to="/register">
          <button>Register New Account</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
