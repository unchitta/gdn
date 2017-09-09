import resource from 'resource-router-middleware';
import location from '../models/location';

export default ({config, db}) => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'location',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    // console.log("Location: ", req);
    let location = location.find(location => location.id === id),
      err = location ? null : 'Not found';
    callback(err, location);
  },

  /** GET / - List all entities */
  index({params}, res) {
    db.query('SELECT * FROM datapoints', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
  },

  /** POST / - Create a new entity */
  create({body}, res) {
    let vals = {
      lineid: body.lineid,
      // geolocation: 'PointFromText(POINT(' + body.geolocation.x + ' ' + body.geolocation.y + '))',
      price: body.price,
      currency: body.currency,
      locname: body.locname,
      time: body.time
    };
    let point = `POINT(${body.geolocation.x} ${body.geolocation.y})`;
    db.query('INSERT INTO datapoints SET ?, geolocation=GeomFromText(?)', [vals, point], (err, results) => {
      if (err) throw err;
      console.log(body, 'BODY');
      res.json("");
    });
  },

  /** GET /:id - Return a given entity */
  read({location}, res) {
    console.log('waat1?!');
    res.json(location);
  },

  /** PUT /:id - Update a given entity */
  update({location, body}, res) {
    for (let key in body) {
      if (key !== 'id') {
        location[key] = body[key];
      }
    }
    res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete({location}, res) {
    location.splice(location.indexOf(location), 1);
    res.sendStatus(204);
  }
});
