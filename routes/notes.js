const express = require('express');
const path = require('path');

const readAndParse = require('../helpers/read-and-parse');

const notesRouter = express.Router();

notesRouter.get('/', async (req, res) => {
    try {
        const data = await readAndParse(path.join(__dirname, '../db/db.json'));
        console.log(data);
        res.json(data);
    } catch (err) {
        throw err;
    }
});

module.exports = notesRouter;
