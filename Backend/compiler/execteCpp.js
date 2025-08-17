const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}


const executecpp = async (filePath,inputFilePath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const outputFilename = `${jobId}.exe`;
    const outPath = path.join(outputPath, outputFilename);

    return new Promise((resolve, reject) => {
        // Compile and run command for Windows
        const command = `g++ "${filePath}" -o "${outPath}" && "${outPath}" < ${inputFilePath}`;

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

module.exports = { executecpp };
