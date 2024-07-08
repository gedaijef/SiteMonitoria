const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const monitoriaRoutes = require('./routes/monitoriaRoutes');
const professorRoutes = require('./routes/professorRoutes');
const serieRoutes = require('./routes/serieRoutes');
const turmaRoutes = require('./routes/turmaRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/alunos', alunoRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/monitorias', monitoriaRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/series', serieRoutes);
app.use('/api/turmas', turmaRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
