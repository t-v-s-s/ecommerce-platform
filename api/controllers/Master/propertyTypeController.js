import pool from "../../config/db.js";

// ======================================
// GET ALL PROPERTY TYPES
// ======================================
export const getPropertyTypes = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM property_type ORDER BY id ASC"
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching property types:", error);
        res.status(500).json({ message: "Server error while fetching property types" });
    }
};

// ======================================
// GET PROPERTY TYPE BY ID
// ======================================
export const getPropertyTypeById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM property_type WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Property type not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching property type by id:", error);
        res.status(500).json({ message: "Server error while fetching property type" });
    }
};

// ======================================
// ADD PROPERTY TYPE
// ======================================
export const addPropertyType = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Property type name is required" });
        }

        const result = await pool.query(
            "INSERT INTO property_type (name) VALUES ($1) RETURNING *",
            [name.trim()]
        );

        res.status(201).json({
            message: "Property type added successfully",
            propertyType: result.rows[0]
        });
    } catch (error) {
        console.error("Error adding property type:", error);

        if (error.code === "23505") {
            return res.status(400).json({ message: "Property type already exists" });
        }

        res.status(500).json({ message: "Server error while adding property type" });
    }
};

// ======================================
// UPDATE PROPERTY TYPE
// ======================================
export const updatePropertyType = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Property type name is required" });
        }

        const result = await pool.query(
            "UPDATE property_type SET name = $1 WHERE id = $2 RETURNING *",
            [name.trim(), id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Property type not found" });
        }

        res.status(200).json({
            message: "Property type updated successfully",
            propertyType: result.rows[0]
        });
    } catch (error) {
        console.error("Error updating property type:", error);

        if (error.code === "23505") {
            return res.status(400).json({ message: "Property type already exists" });
        }

        res.status(500).json({ message: "Server error while updating property type" });
    }
};

// ======================================
// DELETE PROPERTY TYPE
// ======================================
export const deletePropertyType = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM property_type WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Property type not found" });
        }

        res.status(200).json({
            message: "Property type deleted successfully",
            propertyType: result.rows[0]
        });
    } catch (error) {
        console.error("Error deleting property type:", error);
        res.status(500).json({ message: "Server error while deleting property type" });
    }
};