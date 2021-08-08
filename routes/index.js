const express = require('express');

const notesRouter = require('./notes');

const apiRouter = express.Router();

apiRouter.use('/notes', notesRouter);

module.exports = apiRouter;
