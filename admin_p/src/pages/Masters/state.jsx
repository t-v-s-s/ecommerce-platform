import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function State() {
    const [stateData, setStateData] = useState([]);
    const [showPopup, setShowPopup] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [stateName, setStateName] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/master/state");
            setStateData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddState = () => {
        setEditId(null);
        setStateName("");
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setStateName(item.name);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this state?")) return;
        await axios.delete(`http://localhost:3000/api/master/state/${id}`);
        fetchStates();
    };

    const saveState = async () => {
        let message = "";

        if (editId) {
            await axios.put(`http://localhost:3000/api/master/state/${editId}`, {
                name: stateName
            });
            message = "State Updated";
        } else {
            await axios.post("http://localhost:3000/api/master/state", {
                name: stateName
            });
            message = "State Added";
        }

        setShowModal(false);
        setStateName("");
        setEditId(null);
        fetchStates();

        setShowPopup(message);
        setTimeout(() => setShowPopup(""), 2000);
    };

    return (
        <>
            {/* Popup */}
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: "fixed",
                        top: "20px",
                        right: "20px",
                        background: "#22c55e",
                        color: "#fff",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                    }}
                >
                    {showPopup}
                </motion.div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        background: "#fff",
                        padding: "25px",
                        borderRadius: "12px",
                        width: "300px"
                    }}>
                        <h3 style={{ marginBottom: "15px" }}>
                            {editId ? "Edit State" : "Add State"}
                        </h3>

                        <input
                            value={stateName}
                            onChange={(e) => setStateName(e.target.value)}
                            placeholder="Enter state name"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid #ddd"
                            }}
                        />

                        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                            <button
                                onClick={saveState}
                                style={{
                                    background: "#f97316",
                                    color: "#fff",
                                    border: "none",
                                    padding: "8px 15px",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: "#e5e7eb",
                                    border: "none",
                                    padding: "8px 15px",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: "rgba(255,255,255,0.9)",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}
            >
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px"
                }}>
                    <h2 style={{ color: "#555" }}>State List</h2>

                    <button
                        onClick={handleAddState}
                        style={{
                            background: "#f97316",
                            color: "#fff",
                            border: "none",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            cursor: "pointer"
                        }}
                    >
                        <Plus size={18} /> Add State
                    </button>
                </div>

                <table width="100%" style={{ borderCollapse: "collapse" }}>
                    <thead style={{ background: "#fff3eb" }}>
                        <tr>
                            <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
                            <th style={{ padding: "10px", textAlign: "left" }}>State Name</th>
                            <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stateData.map((item) => (
                            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "10px" }}>{item.id}</td>
                                <td style={{ padding: "10px" }}>{item.name}</td>
                                <td style={{ padding: "10px" }}>
                                    <Pencil
                                        size={18}
                                        color="orange"
                                        style={{ cursor: "pointer", marginRight: "10px" }}
                                        onClick={() => handleEdit(item)}
                                    />
                                    <Trash2
                                        size={18}
                                        color="red"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleDelete(item.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </>
    );
}
