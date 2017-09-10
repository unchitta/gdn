const sexagesimal = require('@mapbox/sexagesimal');
const randomcolor = require('randomcolor');
require('dotenv').config({
  path: '../server/.env'
});
const fs = require('fs');
$ = jQuery = require('jquery');
require('jquery-csv');
const mysql = require('mysql');

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

  console.log("Truncating table....\n");
  db.query('TRUNCATE table known_loc', (err, results) => {
    if (err) throw err;

    console.log("Importing...\n");
    const sample = '../data/thai-islands.csv';
    fs.readFile(sample, 'UTF-8', function (err, csv) {
      $.csv.toArrays(csv, {}, function (err, data) {
        for (var i = 0, len = data.length; i < len; i++) {
          if (i == 0) {
            continue;
          }

          if (data[i].length != 3) {
            continue;
          }

          if (data[i][2] == '') {
            continue;
          }

          const rcolor = randomcolor();
          const latlon = data[i][2].trim().split(" ");
          const lat = sexagesimal(latlon[0]);
          const lon = sexagesimal(latlon[1]);
          if (lat === "" || lon === "") {
            console.log("Cannot parse latlon: " + latlon.join(" "));
            continue;
          }
          const v = {
            name: data[i][0].trim(),
            thainame: data[i][1].trim(),
            color: rcolor
          };

          let point = `POINT(${lat} ${lon})`;
          db.query('INSERT INTO known_loc SET ?, geolocation=GeomFromText(?)', [v, point], (err, results) => {
            if (err) throw err;
          });
        }
      });
    });
  });
});


// console.log(sexagesimal('12.06°N') + "\n");
// console.log(sexagesimal('98°30′02.02″E'));

