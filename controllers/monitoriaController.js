const pool = require('../models/db');

exports.getAlunosByCriteria = async (req, res) => {
  const { data, horario, disciplina, serie } = req.query;
  try {
    const result = await pool.query(
      `SELECT a.nome
       FROM Aluno a
       JOIN Monitoria mon ON mon.aluno_id = a.id
       JOIN Disciplina disc ON disc.id = mon.disciplina_id
       WHERE mon.data = $1
         AND mon.horario = $2
         AND disc.nome = $3
         AND mon.serie_id = $4`,
      [data, horario, disciplina, serie]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createMonitoria = async (req, res) => {
  const { aluno_id, serie_id, disciplina_id, turma_id, data, horario } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Monitoria (aluno_id, serie_id, disciplina_id, turma_id, data, horario)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [aluno_id, serie_id, disciplina_id, turma_id, data, horario]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
