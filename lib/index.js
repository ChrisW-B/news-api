var request = require('request'),
	rp = require('request-promise-native');

var NewsApi = function(opts) {
	opts = opts || {};
	var apiKey, debug, self = this;
	if (opts.apiKey !== undefined && opts.apiKey !== '')
		this.apiKey = opts.apiKey;
	this.debug = opts.debug || false;

	self._getData = function(type, qs, callback, fullRes = false) {
		var self = this;
		qs.apiKey = this.apiKey;
		var opt = {
			method: 'GET',
			uri: 'https://newsapi.org/v1/' + type,
			json: true,
			qs: qs,
			resolveWithFullResponse: fullRes
		};
		rp(opt).then(
			function(res) {
				if (res.status === 'error') {
					res.success = false;
					callback(res);
				} else {
					res.success = true;
					callback(res);
				}
			}).catch(
			function(err) {
				callback({
					success: false,
					error: err
				});
				if (self.debug)
					console.log("Exception: ", err);
			}
		);
	};
};

NewsApi.prototype.init = function(opts) {
	var apiKey, debug;
	if (opts.apiKey !== undefined && opts.apiKey !== '')
		this.apiKey = opts.apiKey;
	this.debug = opts.debug || false;
};

NewsApi.prototype.getArticles = function(opt) {
	// returns articles from a given source
	var qs = opt || {};
	if (qs.source === '' || qs.source === undefined) {
		opt.callback({
			success: false,
			status: 'error',
			error: {
				'#': 'You must provide a source'
			}
		});
		return;
	}
	this._getData('articles', qs, function(res) {
		// res.results.success = true;
		opt.callback(res);
	});
};

NewsApi.prototype.getSources = function(opt) {
	// returns possible sources
	var qs = opt || {};
	this._getData('sources', qs, function(res) {
		// res.results.success = true;
		opt.callback(res);
	});
};

module.exports = NewsApi;