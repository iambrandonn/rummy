var deck = require('../scripts/shuffle');
var assert = require('assert');

describe('shuffleTest', function(){
  it('should test that items are no longer in place', function(){
    var numbers = [];
    for (var i = 0; i < 100; i++) {
      numbers.push(i);
    }
    var result = deck.shuffle(numbers);

    var sameCount = 0;
    for (var i = 0; i < numbers.length; i++) {
      if (numbers[i] === result[i]) {
        sameCount++;
      }
    }

    assert((sameCount / numbers.length) < .06);
  });
});