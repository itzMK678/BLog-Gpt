import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

const RegisterPage = ({ onBack }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(user => user.id === id);
    if (exists) return alert("❌ User already exists");

    users.push({ id, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Registered successfully!");
    onBack(); 
  };

  return (
    <>
    <div className="register-page">
      <div id="register-box">
      <h2 >📝 Register</h2>
      <input value={id} onChange={e => setId(e.target.value)} placeholder="ID"  />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
      <button onClick={handleRegister} >Register</button>
       <Link to="/login"><button onClick={onBack}  >Back to Login</button></Link>
      </div>
    </div>
    </>
  );
};

export default RegisterPage;
