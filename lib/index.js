'use strict';
const rp = require('request-promise-native');

const NewsApi = function(opts) {
	opts = opts || {};
	const self = this;
	if (opts.apiKey !== undefined && opts.apiKey !== '')
		this.apiKey = opts.apiKey;
	this.debug = opts.debug || false;

	self._getData = (type, qs) => {
		const self = this;
		return new Promise((resolve, reject) => {
			qs.apiKey = self.apiKey;
			const opt = {
				method: 'GET',
				uri: `https://newsapi.org/v1/${type}`,
				json: true,
				qs: qs
			};
			rp(opt).then(res => {
				if (res.status === 'error') {
					reject(res);
				} else {
					resolve(res);
				}
			}).catch(err => {
				if (self.debug)
					console.log(`Exception: ${err}`);
				reject(err.error);
			});
		});
	};

	self._get = (type, qs, callback) => {
		if (callback) {
			self._getData(type, qs).then(res => {
				res.success = true;
				callback(res);
			}).catch(err => {
				callback(err);
			});
		} else {
			return new Promise((resolve, reject) => {
				self._getData(type, qs).then(res => {
					resolve(res);
				}).catch(err => {
					reject(err);
				});
			});
		}
	};

	self._sendErr = (msg, callback) => {
		// handles error checking within library,
		// whether using callbacks or promises
		let errMsg = {
			error: 6,
			message: msg
		};
		if (callback) {
			errMsg.success = false;
			callback(errMsg);
		} else {
			return new Promise((_, reject) => {
				reject(errMsg);
			});
		}
	};
};

NewsApi.prototype.init = function(opts) {
	if (opts.apiKey !== undefined && opts.apiKey !== '')
		this.apiKey = opts.apiKey;
	this.debug = opts.debug || false;
};

NewsApi.prototype.getArticles = function(opt) {
	// returns articles from a given source
	const qs = opt || {},
		self = this;
	if (qs.source === '' || qs.source === undefined) {
		return self._sendErr('You must provide a source', qs.callback);
	}
	return this._get('articles', qs, qs.callback);
};

NewsApi.prototype.getSources = function(opt) {
	// returns possible sources
	const qs = opt || {},
		self = this;
	return self._get('sources', qs, qs.callback);
};

module.exports = NewsApi;