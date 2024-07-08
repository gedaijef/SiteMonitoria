const pool = require('../models/db');

exports.getAllProfessores = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM professores');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}