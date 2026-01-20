const fs = require('fs');

function countStudents(path) {
  let data;

  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const lines = data
    .split('\n')
    .filter((line) => line.trim() !== '');

  const students = lines.slice(1); // remove header

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
    console.log(
      `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`
    );
  }
}

module.exports = countStudents;
