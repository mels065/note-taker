const fs = require('fs');

async function readAndParse(filePath) {
    try {
        const data = await new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) reject(err);
                else resolve(data)
            })
        });
        const newData = JSON.parse(data);
        return newData;
    } catch (err) {
        throw err;
    }
}

module.exports = readAndParse;
