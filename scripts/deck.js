/* global Card */
/* exported Deck */

function Deck() {
  this.cards =  [];

  this.shuffle = function() {
    this.cards = this.shuffleArray(this.cards);
  };

  this.shuffleArray = function (toShuffle) {
    // Make a copy of the array that we can pull items from
    var arrayCopy = toShuffle.slice(0);

    // Create the target array
    var newArray = new Array(arrayCopy.length);

    /* This function will attempt to place a value at the given index
       If that index is already taken it will try the next spot,
      wrapping to the beginning of the array if necessary */
    var placeAt = function(index, value) {
      if (newArray[index] === undefined) {
        newArray[index] = value;
      }
      else {
        if (index + 1 === newArray.length) {
          placeAt(0, value);
        }
        else {
          placeAt(index + 1, value);
        }
      }
    };

    // Pull a random element from the array and insert it into 
    // a random place in the new array
    for (var i = 0; i < newArray.length; i++) {
      // Choose a random element to work with
      var index = Math.floor((Math.random() * arrayCopy.length));
      placeAt(Math.floor(Math.random() * arrayCopy.length), arrayCopy[index]);

      // Remove that element from the old array
      arrayCopy.splice(index, 1);
    }

    return newArray;
  };

  this.addElementsToDom = function() {
    var body = document.body;

    for (var i = 0; i < this.cards.length; i++) {
      body.appendChild(this.cards[i].element);
    }
  };

  for (var suit = 0; suit <= 3; suit++) {
    var suitValue;
    switch (suit) {
      case 0:
        suitValue = 'club';
        break;
      case 1:
        suitValue = 'spade';
        break;
      case 2:
        suitValue = 'heart';
        break;
      case 3:
        suitValue = 'diamond';
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
  this.addElementsToDom();
}