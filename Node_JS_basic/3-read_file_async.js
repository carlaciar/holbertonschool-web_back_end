const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .filter((line) => line.trim() !== '');

      const students = lines.slice(1);

      console.log(`Number of students: ${students.length}`);

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
          console.log(
            `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
          );
        }
      }

      resolve();
    });
  });
}

module.exports = countStudents;
