import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function PropertyType() {
    const [propertyTypeData, setPropertyTypeData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [propertyTypeName, setPropertyTypeName] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchPropertyTypes();
    }, []);

    const fetchPropertyTypes = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/master/property-type");
            setPropertyTypeData(res.data);
        } catch (error) {
            console.error("Error fetching property types:", error);
        }
    };

    // ADD BUTTON
    const handleAddPropertyType = () => {
        setEditId(null);
        setPropertyTypeName("");
        setShowModal(true);
    };

    // EDIT BUTTON
    const handleEdit = (item) => {
        setEditId(item.id);
        setPropertyTypeName(item.name);
        setShowModal(true);
    };

    // DELETE BUTTON
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property type?")) return;

        try {
            await axios.delete(`http://localhost:3000/api/master/property-type/${id}`);
            fetchPropertyTypes();
        } catch (error) {
            console.error("Error deleting property type:", error);
        }
    };

    // SAVE (ADD + UPDATE)
    const savePropertyType = async () => {
        try {
            if (editId) {
                // UPDATE
                await axios.put(`http://localhost:3000/api/master/property-type/${editId}`, {
                    name: propertyTypeName
                });
            } else {
                // ADD
                await axios.post("http://localhost:3000/api/master/property-type", {
                    name: propertyTypeName
                });
            }

            setPropertyTypeName("");
            setEditId(null);
            setShowModal(false);
            fetchPropertyTypes();

            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);

        } catch (error) {
            console.error("Error saving property type:", error);
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
                    transition={{ duration: 0.5 }}
                    style={popupStyle}
                >
                    {editId ? "Property Type Updated Successfully" : "Property Type Added Successfully"}
                </motion.div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div style={overlayStyle}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={modalStyle}
                    >
                        <h3>{editId ? "Edit Property Type" : "Add Property Type"}</h3>

                        <input
                            type="text"
                            placeholder="Enter property type"
                            value={propertyTypeName}
                            onChange={(e) => setPropertyTypeName(e.target.value)}
                            style={inputStyle}
                        />

                        <div style={{ marginTop: "15px" }}>
                            <button
                                onClick={savePropertyType}
                                style={{
                                    background: "#22c55e",
                                    color: "#fff",
                                    border: "none",
                                    padding: "8px 15px",
                                    marginRight: "10px",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: "#ef4444",
                                    color: "#fff",
                                    border: "none",
                                    padding: "8px 15px",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Main Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    marginTop: "10px",
                    background: "rgba(255,255,255,0.8)",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#555" }}>
                        Property Type List
                    </h2>

                    <button
                        onClick={handleAddPropertyType}
                        style={{
                            border: "none",
                            background: "#f97316",
                            color: "#fff",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}
                    >
                        <Plus size={18} />
                        Add Property Type
                    </button>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "10px" }}>
                    <thead>
                        <tr style={{ background: "#fff3eb" }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Property Type Name</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propertyTypeData.map((item) => (
                            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={tdStyle}>{item.id}</td>
                                <td style={tdStyle}>{item.name}</td>
                                <td style={tdStyle}>
                                    <button onClick={() => handleEdit(item)} style={iconButtonStyle}>
                                        <Pencil size={18} color="#f97316" />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} style={iconButtonStyle}>
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