var chai = require('chai');
var expect = chai.expect;
var fulltext = require('lacona-util-fulltext');
var lacona = require('lacona');
var es = require('event-stream');

var integer = require('..').integer;

describe('integer', function () {
  var parser, test;

  beforeEach(function () {
    parser = new lacona.Parser();
    test = lacona.createPhrase({
      name: 'test/test',
      describe: function () {
        return integer({id: 'integer'});
      }
    });
    parser.sentences = [test()];
  });

  it('handles a valid integer', function (done) {
    function callback(err, data) {
      expect(data).to.have.length(3);

      expect(fulltext.match(data[1].data)).to.equal('1234');
      expect(data[1].data.result.integer).to.equal(1234);
      done();
    }

    es.readArray(['1234'])
      .pipe(parser)
      .pipe(es.writeArray(callback));
  });

  it('rejects an invalid integer', function (done) {
    function callback(err, data) {
      expect(data).to.have.length(2);
      done();
    }

    es.readArray(['1234.0'])
      .pipe(parser)
      .pipe(es.writeArray(callback));
  });
});
