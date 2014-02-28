var arrayShuffler = require('./shuffle');
var Card = require('./card');

module.exports = {
  cards:  [],
  shuffle: function() {
    this.cards = arrayShuffler.shuffle(this.cards);
  },
  init: function() {
    for (var suit = 0; suit <= 3; suit++) {
      var suitValue;
      switch (suit) {
        case 0:
          suitValue = 'C';
          break;
        case 1:
          suitValue = 'S';
          break;
        case 2:
          suitValue = 'H';
          break;
        case 3:
          suitValue = 'D';
          break;
      }
      this.cards.push(new Card(suitValue, 'A'));
      this.cards.push(new Card(suitValue, '2'));
      this.cards.push(new Card(suitValue, '3'));
      this.cards.push(new Card(suitValue, '4'));
      this.cards.push(new Card(suitValue, '5'));
      this.cards.push(new Card(suitValue, '6'));
      this.cards.push(new Card(suitValue, '7'));
      this.cards.push(new Card(suitValue, '8'));
      this.cards.push(new Card(suitValue, '9'));
      this.cards.push(new Card(suitValue, '10'));
      this.cards.push(new Card(suitValue, 'J'));
      this.cards.push(new Card(suitValue, 'Q'));
      this.cards.push(new Card(suitValue, 'K'));
    }

    this.shuffle();
  }
};