import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, User, Settings, LogOut } from "lucide-react";

export default function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [active, setActive] = useState("home");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) setUsername(storedUsername);
        else navigate("/login");
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("username");
        navigate("/login");
    };

    const menu = [
        { name: "home", icon: <Home size={20} /> },
        { name: "profile", icon: <User size={20} /> },
        { name: "settings", icon: <Settings size={20} /> }
    ];

    return (
        <div style={{
            display: "flex",
            height: "100vh",
            background: "linear-gradient(to bottom right, #f3f4f6, #e5e7eb)"
        }}>

            {/* Sidebar */}
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                style={{
                    width: "250px",
                    background: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "20px",
                    borderRight: "1px solid #ddd"
                }}
            >
                <div>
                    <h2 style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#f97316",
                        marginBottom: "30px"
                    }}>
                        🚀 MyApp
                    </h2>

                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {menu.map((item) => (
                            <li
                                key={item.name}
                                onClick={() => setActive(item.name)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "12px",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    marginBottom: "10px",
                                    transition: "0.3s",
                                    background: active === item.name ? "#f97316" : "transparent",
                                    color: active === item.name ? "#fff" : "#555"
                                }}
                            >
                                {item.icon}
                                <span style={{ textTransform: "capitalize" }}>
                                    {item.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={logout}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        padding: "12px",
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer"
                    }}
                >
                    <LogOut size={18} /> Logout
                </button>
            </motion.div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: "20px",
                overflowY: "auto"
            }}>

                {/* Navbar */}
                <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(10px)",
                        padding: "20px",
                        borderRadius: "15px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        marginBottom: "20px"
                    }}
                >
                    <h2 style={{ fontSize: "20px", color: "#555" }}>
                        Welcome, <span style={{ color: "#f97316", fontWeight: "bold" }}>
                            {username}
                        </span> 👋
                    </h2>
                </motion.div>

                {/* Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "20px"
                    }}
                >
                    {[
                        { title: "Users", value: "1,245" },
                        { title: "Revenue", value: "$12,340" },
                        { title: "Performance", value: "89%" }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            style={{
                                background: "rgba(255,255,255,0.8)",
                                padding: "20px",
                                borderRadius: "15px",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                            }}
                        >
                            <h3 style={{ color: "#555" }}>{card.title}</h3>
                            <p style={{
                                fontSize: "28px",
                                fontWeight: "bold",
                                color: "#f97316",
                                marginTop: "10px"
                            }}>
                                {card.value}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Dynamic Section */}
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        marginTop: "30px",
                        background: "rgba(255,255,255,0.8)",
                        padding: "20px",
                        borderRadius: "15px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                    }}
                >
                    <h2 style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "#555",
                        textTransform: "capitalize"
                    }}>
                        {active} Section
                    </h2>

                    <p style={{ color: "#777", marginTop: "10px" }}>
                        This is the {active} section content.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}