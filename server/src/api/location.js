import resource from 'resource-router-middleware';
import location from '../models/location';
import { Client } from '@line/bot-sdk';

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
    db.query('SELECT d.id, lineid, d.geolocation, price, currency, locname, UNIX_TIMESTAMP(time) as time, k.color FROM datapoints d LEFT JOIN known_loc k ON d.locname = k.name', function (error, results, fields) {
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

    // Send the messsage to the user
    const userId = body.lineid;
    const client = new Client({ 
      channelAccessToken: 'aRYpX5jVUw532GwFclyrfEikfymSoPzGhwEG72vE+AwvrjD5cUW73rUXiyhg9GlTTSJEAYHha4Jo17X43reEJ4J7fEo8nrEYwzQ48c3NhqWNcLf6jIH4Y7opHHfit9v3DcNoEQnpuUTGkjHTh1eINgdB04t89/1O/w1cDnyilFU=',
      channelSecret: 'bf4f42623160c813aad4cab0d3ee67b3'
    });
    client.pushMessage(userId, {
      type: 'text',
      text: 'Thank your for participating, here is some coins to thank you.'
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
