const pool = require("./db");

const Serie = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM Serie");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM Serie WHERE id = $1", [id]);
    return result.rows[0];
  },

  create: async (ano, turma_id) => {
    const result = await pool.query(
      "INSERT INTO Serie (ano, turma_id) VALUES ($1, $2) RETURNING *",
      [ano, turma_id]
    );
    return result.rows[0];
  }
};

module.exports = Serie;