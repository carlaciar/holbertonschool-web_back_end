const http = require('http');
const fs = require('fs');

const database = process.argv[2];

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.write('This is the list of our students\n');

    fs.readFile(database, 'utf-8', (err, data) => {
      if (err) {
        res.end('Cannot load the database\n');
        return;
      }

      const lines = data
        .split('\n')
        .filter((line) => line.trim() !== '');

      const students = lines.slice(1);

      res.write(`Number of students: ${students.length}\n`);

      const fields = {};

      students.forEach((line) => {
        const values = line.split(',');
        const firstName = values[0];
        const field = values[values.length - 1];

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      });

      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          res.write(
            `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`,
          );
        }
      }

      res.end();
    });

    return;
  }

  res.end();
});

app.listen(1245);

module.exports = app;
