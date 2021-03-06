import resource from 'resource-router-middleware';
import location from '../models/location';
import { Client } from '@line/bot-sdk';

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
    
    if (body.events && body.events.length) {
      console.log(body.events[0]);
      // if (body.events[0].type === 'follow') {
        const userId = body.events[0].source.userId;
        const client = new Client({ 
          channelAccessToken: 'aRYpX5jVUw532GwFclyrfEikfymSoPzGhwEG72vE+AwvrjD5cUW73rUXiyhg9GlTTSJEAYHha4Jo17X43reEJ4J7fEo8nrEYwzQ48c3NhqWNcLf6jIH4Y7opHHfit9v3DcNoEQnpuUTGkjHTh1eINgdB04t89/1O/w1cDnyilFU=',
          channelSecret: 'bf4f42623160c813aad4cab0d3ee67b3'
        });
        client.pushMessage(userId, {
          type: 'text',
          text: "Please help us. Help you by answering our 1-minute survey. Your answer will help improve our country and our islands. You'll get 2 line points immediately in return for your precious time. https://survey.delta9.link/?userId=" + userId
        });
      // }
    }


    res.send('ok');
  },
});
