const fs = require('fs');

async function readAndAppend(filePath, item) {
    try {
        const buffer = await new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    
        const data = JSON.parse(buffer);
        data.push(item);
    
        return await new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    } catch (err) {
        throw err;
    }
}

module.exports = readAndAppend;
