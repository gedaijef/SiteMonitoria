const Aluno = require('../models/aluno');

exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.getAll();
    res.json(alunos);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.createAluno = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const aluno = await Aluno.create(nome, email);
    res.status(201).json(aluno);
  } catch (error) {
    res.status(500).send(error.message);
  }
};