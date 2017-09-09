import resource from 'resource-router-middleware';
import location from '../models/location';

export default ({config, db}) => resource({

  /** Property name to store preloaded entity on `request`. */
  id: 'lineWebhook',

  /** GET / - List all entities */
  index({params}, res) {
    console.log(params);
    res.send('ok');
  },

  /** POST / - Create a new entity */
  create({body}, res) {
    console.log(body);
    res.send('ok');
  },
});
