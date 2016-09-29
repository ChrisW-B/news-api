var NewsApi = require('../lib'),
	config = require('./config');
var news = new NewsApi({
	apiKey: config.apiKey
});


news.getSources({
	category: 'technology',
	language: 'en',
	country: 'us',
	callback(res) {
		console.log(res);
	}
});

news.getArticles({
	source: 'ars-technica',
	sortBy: 'latest',
	callback(res) {
		console.log(res);
	}
});