import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            console.log("LOGIN RESPONSE:", data);

            if (response.ok) {
                localStorage.setItem("username", data.username);
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login Error: unable to connect server");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Login</h2>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                <button className="btn" onClick={handleLogin}>Login</button>

                <p>
                    Don't have an account?
                    <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/register")}>
                        {" "}Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;