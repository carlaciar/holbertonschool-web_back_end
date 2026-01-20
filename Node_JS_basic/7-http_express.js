const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

// Route: /
app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

// Route: /students
app.get('/students', (req, res) => {
  res.type('text/plain');
  res.write('This is the list of our students\n');

  fs.readFile(database, 'utf-8', (err, data) => {
    if (err) {
      // IMPORTANT: no trailing newline
      res.end('Cannot load the database');
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
});

app.listen(1245);

module.exports = app;
