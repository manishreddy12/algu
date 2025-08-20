const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const executePy = async (filePath, inputFilePath) => {
    return new Promise((resolve, reject) => {
        // Command to run Python with input redirection (if inputFilePath is given)
        const command = inputFilePath
            ? `python "${filePath}" < "${inputFilePath}"`
            : `python "${filePath}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
                return;
            }
            if (stderr) {
                reject({ stderr });
                return;
            }
            resolve(stdout);
        });
    });
};

module.exports = { executePy };
