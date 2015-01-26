//
// 	it('handles a valid float', function (done) {
// 		var grammar = {
// 			phrases: [
// 				{
// 					name: 'test',
// 					root: {
// 						type: 'float',
// 						id: 'test'
// 					},
// 				}
// 			],
// 			dependencies: [number]
// 		};
//
// 		var handleData = sinon.spy(function (data) {
// 			expect(data.match[0].string).to.equal('12.34');
// 			expect(data.result.test).to.equal(12.34);
// 		});
//
// 		var handleEnd = function () {
// 			expect(handleData).to.have.been.called.once;
// 			done();
// 		};
//
// 		parser
// 		.understand(grammar)
// 		.on('data', handleData)
// 		.on('end', handleEnd)
// 		.parse('12.34')
// 	});
//
// 	it('rejects an invalid float', function (done) {
// 		var grammar = {
// 			phrases: [
// 				{
// 					name: 'test',
// 					root: {
// 						type: 'float',
// 						id: 'test'
// 					},
// 				}
// 			],
// 			dependencies: [number]
// 		};
//
// 		var handleData = sinon.spy();
//
// 		var handleEnd = function () {
// 			expect(handleData).to.not.have.been.called;
// 			done();
// 		};
//
// 		parser
// 		.understand(grammar)
// 		.on('data', handleData)
// 		.on('end', handleEnd)
// 		.parse('123.4.34')
// 	});
// });
