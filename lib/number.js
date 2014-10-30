var lutil = require('lacona-util');

function checkString(inputString, validateRegex, convertFunction, data) {
	var i, number, stringPart;
	var substrings = lutil.substrings(inputString);
	var substringsLength = substrings.length;

	for (i = 0; i < substringsLength; i++) {
		stringPart = substrings[i];
		if (stringPart.match(validateRegex)) {
			number = convertFunction(stringPart);
			if (!isNaN(number) &&
				(this.max == null || number <= this.max) &&
				(this.min == null || number >= this.min)) {
					data({
						display: stringPart,
						value: number
					});
			}
		}
	}
}

module.exports = {
	scope: {
		integer: function (inputString, data, done) {
			checkString(inputString, /^\d+$/, parseInt, data);
			done();
		},
		float: function (inputString, data, done) {
			checkString(inputString, /^(\d+\.\d*|\d*\.\d+|\d+)$/, parseFloat, data);
			done();
		}
	},

	phrases: [{
		name: 'integer',
		schemas: [{
			langs: ["default"],
			root: { type: "value", compute: "integer", id: "@value" }
		}]
	}, {
		name: 'float',
		schemas: [{
			langs: ["default"],
			root: { type: "value", compute: "float", id: "@value" }
		}]
	}]
};
