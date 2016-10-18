const NewsApi = require('../lib'),
	config = require('./config');
const news = new NewsApi({
	apiKey: config.apiKey
});

news.getSources({
	category: 'technology',
	language: 'en',
	country: 'us',
	callback(res) {
		if (res.success) {
			console.log(res);
		}
	}
});

news.getArticles({
	source: 'ars-technica',
	sortBy: 'latest',
	callback(res) {
		if (res.success) {
			console.log(res);
		} else {
			console.log(res);
		}
	}
});

// You can also use promises!
news.getSources().then(function(res) {
	console.log(res);
}).catch(function(err) {
	console.log(err);
});

news.getArticles({
	source: 'ars-technica',
	sortBy: 'latest'
}).then(function(res) {
	console.log(res);
}).catch(function(err) {
	console.log(err);
});