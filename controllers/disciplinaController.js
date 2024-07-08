const pool = require('../models/db');

exports.getAllDisciplinas = async (req, res) => {
    try {
        const disciplinas = await pool.query('SELECT * FROM disciplina');
        res.json(disciplinas.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};