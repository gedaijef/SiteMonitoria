const Serie = require('../models/serie');

exports.getAllSeries = async (req, res) => {
    try {
        const result = await Serie.getAll();
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};