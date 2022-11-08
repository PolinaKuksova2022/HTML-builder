const fs = require('fs');
const readdir = require('fs/promises');
const path = require('path');

const folderPathFrom = path.join(__dirname, 'files');
const folderPathTo = path.join(__dirname, 'files-copy');

fs.rm(folderPathTo, { recursive: true }, () => {
    
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
        if (err) return console.error(err.message);
        console.log('Папка была создана');
    });
    
    fs.readdir(folderPathFrom, (error, files) => {
        if (error) return console.error(error.message);
    
        files
        .forEach(x => {
            fs.copyFile(path.join(folderPathFrom, x), path.join(folderPathTo, x), (err) => {
                if (err) throw err;
              }); 
        });
        console.log('копирование окончено');
    });
})
