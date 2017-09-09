import { version } from '../../package.json';
import { Router } from 'express';
import location from './location';
import lineWebhook from './lineWebhook';

export default ({ config, db }) => {
	let api = Router();

	// mount the location resource
	api.use('/location', location({ config, db }));

	api.use('/line-webhook', lineWebhook({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
