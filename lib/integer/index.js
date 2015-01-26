var lacona = require('lacona');
var freetext = require('lacona-phrase-freetext');

module.exports = lacona.createPhrase({
  name: 'lacona/integer',
	integer: function (inputString, data, done) {
		done();
	},
  getValue: function (result) {
    return parseInt(result.integer);
  },
  describe: function () {
    return freetext({
      id: 'integer',
      regex: /^\d+$/,
      default: '1'
    });
  }
});
