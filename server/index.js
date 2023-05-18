const express = require('express');
const app = express();

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

// create table names if not exists
connection.query('CREATE TABLE IF NOT EXISTS names (name VARCHAR(255))');

// insert names if table is empty
connection.query('SELECT * FROM names', (err, rows) => {
  if (err)
    throw err;

  if (rows.length === 0) {
    connection.query('INSERT INTO names (name) VALUES ("João"), ("Maria"), ("José")');
  }
});

app.get('/', (req, res) => {
  let result = [];
  connection.query('SELECT * FROM names', (err, rows) => {
    if (err)
      throw err;

    rows.forEach(row => {
      result.push(row.name);
    });
  }).on('end', () => {
    res.send(`
    <div>
      <h1>Full Cycle Rocks!</h1>
      <h2>Pessoas cadastradas:</h2>
      <ul>
        ${result.map(name => `<li>${name}</li>`).join('')}
      </ul>
    </div>`);
  });

});

app.listen(3000, () => {
  console.log('Rodando na porta 3000');
})