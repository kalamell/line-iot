const express = require('express');
const line = require('@line/bot-sdk');

const config = {
	channelAccessToken: 'EvYnB8Ueh2DZvqM9QstqoBG9bvyinfrOe4eqiPOAqippomGOuw/umAfGRDY/ZFWQ5Sq1jEi1wMZIp7OMtB8k+W6lSYPrPpMYOIECuSUig9szW/zdFmwFRCyGUyn1p6QipMYnkfOUOwQFZD+mW/duggdB04t89/1O/w1cDnyilFU=',
	channelSecret: '36b2e1a9ddc636e000b44af09a514cb8'
}

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
	Promise
		.all(req.body.events.map(hdanleEvent))
		.then((result) => res.json(result));

	return res.json({status: 'ok'});
});

const client = new line.Client(config);
function hdanleEvent(event) {
	if (event.type !== 'message' || event.message.type !== 'text') {
		return Promise.resolve(null);
	}

	return client.replyMessage(event.replyToken, {
		type: 'text',
		text: event.message.text
	})
}

app.listen(3000);

