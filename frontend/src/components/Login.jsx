import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:3000/api/login",
                formData
            );

            console.log(res.data);

            // Save token / user
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);

            alert(" Login successful");

            navigate("/"); // redirect after login

        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message || " Login failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-pink-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Welcome Back
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-6 border rounded-lg"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>
                <p className="text-center text-sm mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}