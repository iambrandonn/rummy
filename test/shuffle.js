// var deck = require('../scripts/shuffle');
// var assert = require('assert');

// describe('shuffleTest', function(){
//   var numbers = [];
//   var result;

//   before(function() {
//     for (var i = 0; i < 100; i++) {
//       numbers.push(i);
//     }
//     result = deck.shuffle(numbers);
//   });

//   it('should test that items are no longer in place', function(){
//     var sameCount = 0;
//     for (var i = 0; i < numbers.length; i++) {
//       if (numbers[i] === result[i]) {
//         sameCount++;
//       }
//     }

//     assert((sameCount / numbers.length) < .06);
//   });

//   it('should test that there arent three numbers in a row', function() {
//     inARowCount = 1;
//     for (var i = 0; i < result.length - 1; i++) {
//       if (result[i] === result[i + 1] - 1) {
//         inARowCount++;
//         assert(inARowCount < 3); 
//       }
//       else {
//         inARowCount = 1;
//       }
//     }
//   });
// });