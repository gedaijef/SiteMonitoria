const pool = require("./db");

const Turma = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM Turma");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM Turma WHERE id = $1", [id]);
    return result.rows[0];
  },

  create: async (nome) => {
    const result = await pool.query(
      "INSERT INTO Turma (nome) VALUES ($1) RETURNING *",
      [ano]
    );
    return result.rows[0];
  },
};

module.exports = Turma;