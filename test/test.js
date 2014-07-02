var async = require('async');
var chai = require('chai');
var expect = chai.expect;
var number = require('../lib/number')
var sinon = require('sinon');
var Parser = require('lacona').Parser;

chai.use(require('sinon-chai'));

describe('number', function () {
	var parser;

	beforeEach(function () {
		parser = new Parser().understand(number);
	});

	it('handles a valid integer', function (done) {
		var schema = {
			root: {
				type: 'integer',
				id: 'test'
			},
			run: ''
		}

		var handleData = sinon.spy(function (data) {
			expect(data.match[0].string).to.equal('1234');
			expect(data.result.test).to.equal(1234);
		});

		var handleEnd = function () {
			expect(handleData).to.have.been.called.once;
			done()
		};

		parser
		.understand(schema)
		.on('data', handleData)
		.on('end', handleEnd)
		.parse('1234')
	});
});
		// var testCases = [
		// 	input: '1234'
		// 	desc: 'valid'
		// 	schema:
		// 	match: '1234'
		// 	result:
		// 		test: 1234
		// 	matches: 1
		// ,
		// 	input: '12b4'
		// 	desc: 'invalid'
		// 	schema:
		// 		root:
		// 			type: 'integer'
		// 		run: ''
		// 	matches: 0
		// ,
		// 	input: '12'
		// 	desc: 'more than max'
		// 	matches: 0
		// ,
		// 	input: '12'
		// 	desc: 'less than min'
		// 	matches: 0
		// ,
		// 	input: '12'
		// 	desc: 'single number (max and min are inclusive)'
		// 	schema:
		// 		root:
		// 			type: 'integer'
		// 			max: 12
		// 			min: 12
		// 			id: 'test'
		// 		run: ''
		// 	match: '12'
		// 	result: 
		// 		test: 12
		// 	matches: 1
		// ]