var chai = require('chai');
var expect = chai.expect;
var number = require('../lib/number')
var sinon = require('sinon');
var Parser = require('lacona').Parser;

chai.use(require('sinon-chai'));

describe('number', function () {
	var parser;

	beforeEach(function () {
		parser = new Parser({sentences: ['test']});
	});

	it('handles a valid integer', function (done) {
		var grammar = {
			phrases: [
				{
					name: 'test',
					root: {
						type: 'integer',
						id: 'test'
					},
				}
			],
			dependencies: [number]
		};

		var handleData = sinon.spy(function (data) {
			expect(data.match[0].string).to.equal('1234');
			expect(data.result.test).to.equal(1234);
		});

		var handleEnd = function () {
			expect(handleData).to.have.been.called.once;
			done();
		};

		parser
		.understand(grammar)
		.on('data', handleData)
		.on('end', handleEnd)
		.parse('1234')
	});

	it('rejects an invalid integer', function (done) {
		var grammar = {
			phrases: [
				{
					name: 'test',
					root: {
						type: 'integer',
						id: 'test'
					},
				}
			],
			dependencies: [number]
		};

		var handleData = sinon.spy();

		var handleEnd = function () {
			expect(handleData).to.not.have.been.called;
			done();
		};

		parser
		.understand(grammar)
		.on('data', handleData)
		.on('end', handleEnd)
		.parse('123.4')
	});

	it('handles a valid float', function (done) {
		var grammar = {
			phrases: [
				{
					name: 'test',
					root: {
						type: 'float',
						id: 'test'
					},
				}
			],
			dependencies: [number]
		};

		var handleData = sinon.spy(function (data) {
			expect(data.match[0].string).to.equal('12.34');
			expect(data.result.test).to.equal(12.34);
		});

		var handleEnd = function () {
			expect(handleData).to.have.been.called.once;
			done();
		};

		parser
		.understand(grammar)
		.on('data', handleData)
		.on('end', handleEnd)
		.parse('12.34')
	});

	it('rejects an invalid float', function (done) {
		var grammar = {
			phrases: [
				{
					name: 'test',
					root: {
						type: 'float',
						id: 'test'
					},
				}
			],
			dependencies: [number]
		};

		var handleData = sinon.spy();

		var handleEnd = function () {
			expect(handleData).to.not.have.been.called;
			done();
		};

		parser
		.understand(grammar)
		.on('data', handleData)
		.on('end', handleEnd)
		.parse('123.4.34')
	});
});
