const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

fs.writeFile(
  path.join(__dirname, 'text.txt'),
  '',
  (error, file) => {
    if (error) return console.error(error.message);

    stdout.write('Рады Вас видеть. Представьтесь, пожалуйста\n');

    stdin.on('data', data => {
      if(data.toString().trim() === 'exit') {
        console.log('До встречи!');
        process.exit();
      }
      stdout.write('Что будете заказывать?\n');
      fs.appendFile(
        path.join(__dirname, 'text.txt'),
        `${data}`,
        err => {
          if (error) return console.error(error.message);
        }
      );
    });
  });
  
  process.on('SIGINT', () => {
    stdout.write('Надеемся, Вам у нас понравилось!');
    process.exit();
});