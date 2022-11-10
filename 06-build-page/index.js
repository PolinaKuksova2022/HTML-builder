const  fs = require("fs");
const path = require('path');
const readdir = require('fs/promises');

const folderPathTo= path.join(__dirname,  'project-dist');
const templatePathFrom = path.join(__dirname, 'template.html');
const componentsPathFrom = path.join(__dirname, 'components');
const styleFolderPathFrom = path.join(__dirname, 'styles');
const styleFolderPathTo= path.join(__dirname,  'project-dist');
const assetsFolderPathFrom = path.join(__dirname, 'assets');
const assetsFolderPathTo = path.join(folderPathTo, 'assets');

fs.rm(folderPathTo, { recursive: true }, () => {
  fs.mkdir(folderPathTo, { recursive: true }, err => {
    if (err) return console.error(err.message);
    console.log('Папка project-dist была создана');
  });
  fs.mkdir(path.join(folderPathTo, 'assets'), { recursive: true }, err => {
      if (err) return console.error(err.message);
      console.log('Папка assets была создана');
  });
  //index.html
  fs.readFile(templatePathFrom, 'utf-8', (err, content) => {
      if (err) return console.error(err.message);
      
      fs.readdir(componentsPathFrom, { withFileTypes:true }, (err, files) => {
          if (err) return console.error(err.message);
          
          files
          .forEach (file => {
              const filePath = path.resolve(componentsPathFrom, file.name);
              let getFilename = file.name;
              let fileName = getFilename.match(/^[a-zA-Z0-9]+/g)[0];
              if (file.isFile()) {
                fs.readFile(filePath, 'utf-8', (err, componentFile) => {
                  if (err) return console.error(err.message);

                  const writeContent = fs.WriteStream(path.join(folderPathTo,  'index.html'));
                  content = content.replace(`{{${fileName}}}`, componentFile);
                  writeContent.write(content);
                  console.log(`Файл ${fileName} добавлен в index.html`);
                })
              }
          })
      })
  })
  // style create
  fs.writeFile(
      path.join(styleFolderPathTo, 'style.css'),
      '',
      (err) => {
          if (err) throw err;
      }
  );

  fs.readdir(styleFolderPathFrom, { withFileTypes: true},  (error, files) => {
      if (error) return console.error(error.message);
      console.log('style.css create');

      files
      .filter(x => !x.isDirectory() && /.css$/.test(x.name))
      .forEach(x => {
          const input = fs.createReadStream(path.join(styleFolderPathFrom, x.name), 'utf-8');
          input.on('data', chunk => {
              fs.appendFile(
                  path.join(styleFolderPathTo, 'style.css'),
                  chunk,
                  err => {
                      if (err) throw err;
                  }
              );
          });
      })
  });
  // assets copy
  fs.cp(assetsFolderPathFrom, assetsFolderPathTo, {recursive: true}, (err) => {
      if (err) throw err;
      console.log('копрование assets files окончено');
  });
})