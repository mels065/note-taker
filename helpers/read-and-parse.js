const fs = require('fs');

async function readAndParse(filePath) {
    try {
        const buffer = await new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) reject(err);
                else resolve(data)
            })
        });
        const data = JSON.parse(buffer);
        return data;
    } catch (err) {
        throw err;
    }
}

module.exports = readAndParse;
