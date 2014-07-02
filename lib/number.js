var _ = require('lodash');
var lutil = require('lacona-util');

module.exports = {
	scope: {
		integer: function (inputString, data, done) {
			var i;
			var integer;
			var stringPart;
			var substrings = lutil.substrings(inputString);
			var substringsLength = substrings.length;

			for (i = 0; i < substringsLength; i++) {
				stringPart = substrings[i];
				if (stringPart.match(/^\d+$/)) {
					integer = parseInt(stringPart);
					if (!isNaN(integer) &&
						(!_.isNumber(this.max) || integer <= this.max) &&
						(!_.isNumber(this.min) || integer >= this.min)) {
						data({
							display: stringPart,
							value: integer
						});
					}
				}
			}
			done();
		}
	},

	schema: {
		name: 'integer',
		grammars: require('./integer')
	}
};

