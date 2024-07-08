const pool = require("./db");

const Monitoria = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM Monitoria");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM Monitoria WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  create: async (
    aluno_id,
    serie_id,
    disciplina_id,
    turma_id,
    data,
    horario
  ) => {
    const result = await pool.query(
      "INSERT INTO Monitoria (aluno_id, serie_id, disciplina_id, turma_id, data, horario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [aluno_id, serie_id, disciplina_id, turma_id, data, horario]
    );
    return result.rows[0];
  },
};