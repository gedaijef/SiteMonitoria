const pool = require('./db');

const Professor = {
    getAll: async () => {
        const result = await pool.query('SELECT * FROM Professor');
        return result.rows;
    },

    getById: async (id) => {
        const result = await pool.query('SELECT * FROM Professor WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (nome, email, disciplina_id) => {
        const result = await pool.query(
            'INSERT INTO Professor (nome, email, disciplina_id) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, disciplina_id]
        );
        return result.rows[0];
    }
};