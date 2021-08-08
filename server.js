const express = require('express');
const path = require('path')

const PORT = 3000 || process.env.PORT;

const app = express();

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})
