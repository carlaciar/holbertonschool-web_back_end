import fs from 'fs';

export default function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = data
        .split('\n')
        .filter((line) => line.trim() !== '');

      const students = lines.slice(1);
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

      resolve(fields);
    });
  });
}
