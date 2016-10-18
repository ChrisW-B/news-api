'use strict';

var expect = require('chai').expect,
	nock = require('nock'),
	NewsApi = require('../lib'),
	responses = require('./responses'),
	results = require('./results'),
	news = new NewsApi({
		apiKey: 'XXX'
	});


it('getSources() should resolve with an object containing the a list of all possible sources when using promises', done => {
	nock('https://newsapi.org/v1')
		.get('/sources')
		.query({
			apiKey: 'XXX'
		})
		.reply(200, responses.sources);
	news.getSources().then(res => {
		expect(res).to.eql(results.sourcesPm);
		done();
	}).catch(() => {
		done()
	});
});