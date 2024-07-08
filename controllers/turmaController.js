const pool = require("../models/db");

exports.getAllTurmas = async (req, res) => {
  try {
    const turmas = await Turma.getAll();
    res.json(turmas);
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
};

exports.getTurmasBySerie = async (req, res) => {
  const { serie } = req.query;
  console.log(`Received serie: ${serie}`);

  try {
    const result = await pool.query(
      `SELECT ARRAY_AGG(t.turma ORDER BY t.turma) AS turmas
      FROM Turma t
      JOIN Serie s ON s.id = t.serie_id
      WHERE s.ano_serie = $1`,
      [serie]
    );

    console.log(`Query result: ${JSON.stringify(result.rows)}`);

    if (result.rows.length > 0) {
      res.json(result.rows[0].turmas);
    } else {
      res
        .status(404)
        .json({
          message: "Nenhuma turma encontrada para a série especificada",
        });
    }
  } catch (error) {
    console.error(`Error executing query: ${error.message}`);
    res.status(500).send(error.message);
  }
};

exports.getTurmasBySerieTeste = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ARRAY_AGG(t.turma ORDER BY t.turma) AS turmas
       FROM Turma t
       JOIN Serie s ON s.id = t.serie_id
       WHERE s.ano_serie = 6`
    );

    console.log(`Query result: ${JSON.stringify(result.rows)}`);

    if (result.rows.length > 0) {
      res.json(result.rows[0].turmas);
    } else {
      res
        .status(404)
        .json({
          message: "Nenhuma turma encontrada para a série especificada",
        });
    }
  } catch (error) {
    console.error(`Error executing query: ${error.message}`);
    res.status(500).send(error.message);
  }
};
