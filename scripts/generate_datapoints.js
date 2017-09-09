require('dotenv').config({
  path: '../server/.env'
});
const mysql = require('mysql');
const faker = require('faker');

const db = mysql.createConnection({
  host: process.env.GDN_DB_HOST,
  user: process.env.GDN_DB_USER,
  password: process.env.GDN_DB_PASS,
  database: process.env.GDN_DB_DB
});

db.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log("Generate data....\n");
  db.query('SELECT * FROM known_loc', (err, results) => {
    if (err) throw err;

    results.forEach((row) => {
      if (row.geolocation === null) {
        return;
      }

      const no = getRandomInt(2, 5);
      for (let i = 0; i < no; i++) {

        const date = faker.date.recent(200);
        const v = {
          lineid: faker.random.word(),
          price: faker.finance.amount(25, 34, 2, ''),
          currency: 'thb',
          locname: row.name,
          // last 200 days
          time: `${date.getYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`,
        };

        const lat = row['geolocation']['x'] + getRandomArbitrary(0.001, 0.01);
        const lon = row['geolocation']['y'] + getRandomArbitrary(0.001, 0.01);

        let point = `POINT(${lat} ${lon})`;
        db.query('INSERT INTO datapoints SET ?, geolocation=GeomFromText(?)', [v, point], (err, results) => {
          if (err) throw err;
        });

      }
    });
  });
});

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
