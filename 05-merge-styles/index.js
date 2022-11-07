const  fs = require("fs");
const path = require('path');
const readdir = require('fs/promises');

const folderPathFrom = path.join(__dirname, 'styles');
const folderPathTo= path.join(__dirname,  'project-dist');

fs.writeFile(
    path.join(folderPathTo, 'bundle.css'),
    '',
    (err) => {
        if (err) throw err;
    }
  );

fs.readdir(folderPathFrom, { withFileTypes: true},  (error, files) => {
    if (error) return console.error(error.message);

    files
     .filter(x => !x.isDirectory() && /.css$/.test(x.name))
     .forEach(x => {
        const input = fs.createReadStream(path.join(folderPathFrom, x.name), 'utf-8');
        input.on('data', chunk => {
            fs.appendFile(
                path.join(folderPathTo, 'bundle.css'),
                chunk,
                err => {
                    if (err) throw err;
                }
            );
        });
     })
});