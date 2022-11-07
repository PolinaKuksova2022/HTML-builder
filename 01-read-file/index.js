const path = require('path');
const fs = require('fs');
const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
stream.on('readable', () => {
    const data = stream.read();
    console.log(data);
});
stream.on('end', () => console.log('End'));
stream.on('error', error => console.log('Error', error.message));