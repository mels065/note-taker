const express = require('express');
const path = require('path');

const readAndParse = require('../helpers/read-and-parse');
const readAndAppend = require('../helpers/read-and-append');

const notesRouter = express.Router();

notesRouter.get('/', async (req, res) => {
    try {
        const data = await readAndParse(path.join(__dirname, '../db/db.json'));
        res.json(data);
    } catch (err) {
        throw err;
    }
});

notesRouter.post('/', async (req, res) => {
    try {
        const { title, text } = req.body;
        if (title && text) {
            const data = await readAndAppend(path.join(__dirname, '../db/db.json'), { title, text });
            res.json({
                success: true,
                data
            });
        } else {
            res.json({
                success: false,
                error: 'Note needs title and text'
            })
        }
    } catch (err) {
        res.json({
            success: false,
            error: err.message
        });
    }
})

module.exports = notesRouter;
