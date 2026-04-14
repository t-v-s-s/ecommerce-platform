import React, { useState } from "react";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:3000/api/register",
                formData
            );

            console.log(res.data);
            alert(" Registration successful");

            setFormData({
                "username": "",
                "email": "",
                "phone": "",
                "password": ""

            });

        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.error || " Registration failed"
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
                    Create Account
                </h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 border rounded-lg"
                    required
                />

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
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
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
                    Register
                </button>

                <p className="text-center text-sm mt-4 text-gray-600">
                    Already have an account?{" "}
                    <span className="text-blue-500 cursor-pointer">
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}