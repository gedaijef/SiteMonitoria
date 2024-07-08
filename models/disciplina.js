const pool = require('./db');

const Disciplina = {

    getAllDisciplinas: async () => {
        const result = await pool.query("SELECT * FROM Disciplina");
        return result.rows;
    },

    getDisciplinaById: async (id) => {
        const result = await pool.query("SELECT * FROM Disciplina WHERE id = $1", [id]);
        return result.rows[0];
    }, 

    create: async (nome) => {   
        const result = await pool.query(
            "INSERT INTO Disciplina (nome) VALUES ($1) RETURNING *",
            [nome]
        );
        return result.rows[0];
    }
};