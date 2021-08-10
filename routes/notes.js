const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const readAndParse = require('../helpers/read-and-parse');
const readAndAppend = require('../helpers/read-and-append');
const { fstat } = require('fs');

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
            const data = await readAndAppend(
                path.join(__dirname, '../db/db.json'),
                {
                    id: uuidv4(),
                    title,
                    text
                }
            );
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
        throw err;
    }
});

notesRouter.delete('/:id', async (req, res) => {
    try {
        if (req.params && req.params.id) {
            const { id } = req.params;
            const data = await readAndParse(
                path.join(__dirname, '../db/db.json')
            );
            const length = data.length;
            const newData = data.filter(item => item.id !== id);
            if (newData.length < length) {
                await new Promise((resolve, reject) => {
                    fs.writeFile(
                        path.join(__dirname, '../db/db.json'),
                        JSON.stringify(newData, null, 4),
                        (err) => {
                            if (err) reject(err);
                            else resolve();
                        }
                    )
                });
                res.json({
                    success: true,
                    message: "Successfully deleted"
                });
            } else {
                res.json({
                    success: false,
                    error: "ID does not exist"
                });
            }
        }
    } catch (err) {
        throw err;
    }
});

module.exports = notesRouter;
