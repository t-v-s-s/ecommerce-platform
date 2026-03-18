import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";



function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate("/login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Register Error:", error);
            alert("Register Error: unable to connect server");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Register</h2>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="phone" type="tel" placeholder="Phone" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

                <button className="btn" onClick={handleRegister}>Register</button>

                <p>
                    Already have an account?
                    <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>
                        {" "}Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;