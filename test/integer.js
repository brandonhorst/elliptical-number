// var chai = require('chai');
// var expect = chai.expect;
// var fulltext = require('lacona-util-fulltext');
// var lacona = require('lacona');
// var es = require('event-stream');
//
// var integer = require('..').integer;
//
// describe('integer', function () {
//   var parser;
//
//   beforeEach(function () {
//     parser = new lacona.Parser();
//   });
//
//   describe('basic usage', function () {
//     var test;
//
//     beforeEach(function () {
//       test = lacona.createPhrase({
//         name: 'test/test',
//         describe: function () {
//           return integer({id: 'integer'});
//         }
//       });
//       parser.sentences = [test()];
//     });
//
//     it('handles a valid integer', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(3);
//
//         expect(fulltext.match(data[1].data)).to.equal('1234');
//         expect(data[1].data.result.integer).to.equal(1234);
//         done();
//       }
//
//       es.readArray(['1234'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//
//     it('rejects an invalid integer', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(2);
//         done();
//       }
//
//       es.readArray(['1234.0'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//   });
//
//   describe('max', function () {
//     var test;
//
//     beforeEach(function () {
//       test = lacona.createPhrase({
//         name: 'test/test',
//         describe: function () {
//           return integer({max: 8});
//         }
//       });
//       parser.sentences = [test()];
//     });
//
//     it('accepts an integer less than max', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(3);
//
//         expect(fulltext.match(data[1].data)).to.equal('7');
//         done();
//       }
//
//       es.readArray(['7'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//
//     it('accepts an integer equal to max', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(3);
//
//         expect(fulltext.match(data[1].data)).to.equal('8');
//         done();
//       }
//
//       es.readArray(['8'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//
//     it('rejects an integer greater than max', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(2);
//         done();
//       }
//
//       es.readArray(['9'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//   });
//
//   describe('min', function () {
//     var test;
//
//     beforeEach(function () {
//       test = lacona.createPhrase({
//         name: 'test/test',
//         describe: function () {
//           return integer({min: 8});
//         }
//       });
//       parser.sentences = [test()];
//     });
//
//     it('accepts an integer greater than min', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(3);
//
//         expect(fulltext.match(data[1].data)).to.equal('9');
//         done();
//       }
//
//       es.readArray(['9'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//
//     it('accepts an integer equal to min', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(3);
//
//         expect(fulltext.match(data[1].data)).to.equal('8');
//         done();
//       }
//
//       es.readArray(['8'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//
//     it('rejects an integer less than min', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(2);
//         done();
//       }
//
//       es.readArray(['7'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//   });
//
//   describe('max and min', function () {
//     var test;
//
//     beforeEach(function () {
//       test = lacona.createPhrase({
//         name: 'test/test',
//         describe: function () {
//           return integer({max: 8, min: 8});
//         }
//       });
//       parser.sentences = [test()];
//     });
//
//     it('rejects an integer greater than max', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(2);
//         done();
//       }
//
//       es.readArray(['9'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//
//     it('accepts an integer between max and min', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(3);
//
//         expect(fulltext.match(data[1].data)).to.equal('8');
//         done();
//       }
//
//       es.readArray(['8'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//
//     it('rejects an integer less than min', function (done) {
//       function callback(err, data) {
//         expect(data).to.have.length(2);
//         done();
//       }
//
//       es.readArray(['7'])
//         .pipe(parser)
//         .pipe(es.writeArray(callback));
//     });
//   });
// });
