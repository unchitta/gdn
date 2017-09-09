import mysql from 'mysql';
require('dotenv').config();

export default callback => {
	// connect to a database if needed, then pass it to `callback`
  let connection = mysql.createConnection({
    host: process.env.GDN_DB_HOST,
    username: process.env.GDN_DB_USER,
    password: process.env.GDN_DB_PASS
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
    callback();
  });
}
