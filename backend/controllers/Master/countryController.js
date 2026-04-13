import pool from "../../config/db.js";

// GET ALL COUNTRIES
export const getCountries = async (req, res) => {
    console.log("In getCountries")
    try {
        const result = await pool.query(
            "SELECT * FROM country ORDER BY id ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching countries" });
    }
};

// GET COUNTRY BY ID
export const getCountryById = async (req, res) => {
    console.log("In getCountryById")
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM country WHERE id = $1",
            [id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching country" });
    }
};

// ADD COUNTRY
export const addCountry = async (req, res) => {
    console.log("In addCountry")
    try {
        const { name } = req.body;
        const result = await pool.query(
            "INSERT INTO country (name) VALUES ($1) RETURNING *",
            [name]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding country" });
    }
};

// UPDATE COUNTRY
export const updateCountry = async (req, res) => {
    console.log("In updateCountry")
    try {
        const { id } = req.params;
        const { name } = req.body;

        const result = await pool.query(
            "UPDATE country SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating country" });
    }
};

// DELETE COUNTRY
export const deleteCountry = async (req, res) => {
    console.log("In deleteCountry")
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM country WHERE id = $1",
            [id]
        );

        res.json({ message: "Country deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting country" });
    }
};

