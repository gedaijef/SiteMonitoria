const pool = require('./db');

const Aluno = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM Aluno');
    return result.rows;
  },
  
  getById: async (id) => {
    const result = await pool.query('SELECT * FROM Aluno WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (nome, email) => {
    const result = await pool.query(
      'INSERT INTO Aluno (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    return result.rows[0];
  },
};

module.exports = Aluno; 