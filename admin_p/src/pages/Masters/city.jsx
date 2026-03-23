import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function City() {
    const [cityData, setCityData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [cityName, setCityName] = useState("");

    const [editModal, setEditModal] = useState(false);
    const [editCityId, setEditCityId] = useState(null);
    const [editCityName, setEditCityName] = useState("");

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/master/city");
            setCityData(res.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    // ADD CITY
    const saveCity = async () => {
        try {
            await axios.post("http://localhost:3000/api/master/city", {
                name: cityName
            });

            setCityName("");
            setShowModal(false);
            fetchCities();

            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        } catch (error) {
            console.error("Error adding city:", error);
        }
    };

    // OPEN EDIT MODAL
    const handleEdit = (id, name) => {
        setEditCityId(id);
        setEditCityName(name);
        setEditModal(true);
    };

    // UPDATE CITY
    const updateCity = async () => {
        try {
            await axios.put(`http://localhost:3000/api/master/city/${editCityId}`, {
                name: editCityName
            });

            setEditModal(false);
            fetchCities();
        } catch (error) {
            console.error("Error updating city:", error);
        }
    };

    // DELETE CITY
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this city?")) return;

        try {
            await axios.delete(`http://localhost:3000/api/master/city/${id}`);
            fetchCities();
        } catch (error) {
            console.error("Error deleting city:", error);
        }
    };

    const iconButtonStyle = {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        marginRight: "10px"
    };

    const thStyle = {
        padding: "12px",
        textAlign: "left",
        color: "#555"
    };

    const tdStyle = {
        padding: "12px",
        color: "#666"
    };

    const popupStyle = {
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "#22c55e",
        color: "white",
        padding: "14px 22px",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        zIndex: 1000,
        fontWeight: "500"
    };

    const overlayStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
    };

    const modalStyle = {
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        width: "300px",
        textAlign: "center"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc"
    };

    return (
        <>
            {/* Success Popup */}
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={popupStyle}
                >
                    City Added Successfully
                </motion.div>
            )}

            {/* ADD CITY MODAL */}
            {showModal && (
                <div style={overlayStyle}>
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={modalStyle}>
                        <h3>Add City</h3>

                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            style={inputStyle}
                        />

                        <div style={{ marginTop: "15px" }}>
                            <button onClick={saveCity} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "8px 15px", marginRight: "10px", borderRadius: "6px" }}>
                                Save
                            </button>

                            <button onClick={() => setShowModal(false)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "6px" }}>
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* EDIT CITY MODAL */}
            {editModal && (
                <div style={overlayStyle}>
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={modalStyle}>
                        <h3>Edit City</h3>

                        <input
                            type="text"
                            value={editCityName}
                            onChange={(e) => setEditCityName(e.target.value)}
                            style={inputStyle}
                        />

                        <div style={{ marginTop: "15px" }}>
                            <button onClick={updateCity} style={{ background: "#22c55e", color: "#fff", border: "none", padding: "8px 15px", marginRight: "10px", borderRadius: "6px" }}>
                                Update
                            </button>

                            <button onClick={() => setEditModal(false)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "6px" }}>
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* TABLE */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{
                    marginTop: "10px",
                    background: "rgba(255,255,255,0.8)",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <h2>City List</h2>

                    <button onClick={() => setShowModal(true)}
                        style={{ background: "#f97316", color: "#fff", padding: "8px 12px", borderRadius: "8px", border: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Plus size={18} />
                        Add City
                    </button>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
                    <thead>
                        <tr style={{ background: "#fff3eb" }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>City Name</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cityData.map((city) => (
                            <tr key={city.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={tdStyle}>{city.id}</td>
                                <td style={tdStyle}>{city.name}</td>
                                <td style={tdStyle}>
                                    <button onClick={() => handleEdit(city.id, city.name)} style={iconButtonStyle}>
                                        <Pencil size={18} color="#f97316" />
                                    </button>
                                    <button onClick={() => handleDelete(city.id)} style={iconButtonStyle}>
                                        <Trash2 size={18} color="#ef4444" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </>
    );
}