var lacona = require('lacona');
var freetext = require('lacona-phrase-freetext');

module.exports = lacona.createPhrase({
  name: 'lacona/float',
  getValue: function (result) {
    return parseFloat(result.float);
  },
  describe: function () {
    return freetext({
      id: 'float',
      regex: /^(\d+\.\d*|\d*\.\d+|\d+)$/,
      default: '1.0'
    });
  }
});
