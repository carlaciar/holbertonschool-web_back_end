const http = require('http');
const countStudents = require('./3-read_file_async');

const database = process.argv[2];

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.write('This is the list of our students\n');

    countStudents(database)
      .then(() => {
        res.end();
      })
      .catch((err) => {
        res.end(`${err.message}\n`);
      });

    return;
  }

  res.end();
});

app.listen(1245);

module.exports = app;
