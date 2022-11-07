const readdir = require('fs/promises');
const  fs = require("fs");
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true},  (error, files) => {
    if (error) return console.error(error.message);

    files
        .filter(x => !x.isDirectory())
        .map(x => path.parse(path.join(folderPath, x.name)))
        .forEach(x => {
            fs.stat(path.join(folderPath, x.base), (err, stat) => {
                if (err) return console.error(err.message)
                console.log(`${x.name} - ${x.ext.replace(/\./g, "")} - ${(stat.size/1024).toFixed(2)}kb`);
            });
        });
});