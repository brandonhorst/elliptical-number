var chai = require('chai');
var expect = chai.expect;
var fulltext = require('lacona-util-fulltext');
var lacona = require('lacona');
var es = require('event-stream');

var float = require('..').float;

describe('float', function () {
  var parser, test;

  beforeEach(function () {
    parser = new lacona.Parser();
    test = lacona.createPhrase({
      name: 'test/test',
      describe: function () {
        return float({id: 'float'});
      }
    });
    parser.sentences = [test()];
  });

  it('handles a valid float', function (done) {
    function callback(err, data) {
      expect(data).to.have.length(3);

      expect(fulltext.match(data[1].data)).to.equal('1234.0');
      expect(data[1].data.result.float).to.equal(1234.0);
      done();
    }

    es.readArray(['1234.0'])
      .pipe(parser)
      .pipe(es.writeArray(callback));
  });

  it('rejects an invalid float', function (done) {
    function callback(err, data) {
      expect(data).to.have.length(2);
      done();
    }

    es.readArray(['1234.0f'])
      .pipe(parser)
      .pipe(es.writeArray(callback));
  });
});
