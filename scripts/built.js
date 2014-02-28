(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Polyfill requestAnimationFrame
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };
(function() {
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame'] || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || // iOS6 is buggy
        !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

// Start of app
window.CARDSIMAGE = new Image();
window.CARDSIMAGE.src = 'cards.png';
window.CARDSIMAGE.onload = function() {
  var count = 0;

  var paint = function() {
    // Clear the screen
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // start drawing in the middle again
    // drawCard(deck.cards[44], x, y , 1, currentAngle);  // 8 of hearts
    deck.cards[44].x += 10;
    deck.cards[44].y += 10;
    deck.cards[44].rotation += Math.PI / 30;
    deck.cards[44].draw(ctx);
    
    if (count++ < 60) {
      window.requestAnimationFrame(paint);
    }
  };

  window.requestAnimationFrame(paint);
};

var deck = require('./deck');
deck.init();
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';


// // var container = $(c).parent();

// //Run function when browser resizes
// // $(window).resize( respondCanvas );

// function respondCanvas(){ 
//     canvas.width = $(container).width(); //max width
//     canvas.height = $(container).height(); //max width
// }

//Initial call 
// respondCanvas();

},{"./deck":3}],2:[function(require,module,exports){
/*global CARDSIMAGE */

module.exports = function(newSuit, newValue) {
  this.value = newValue;
  this.suit = newSuit;
  this.rotation = 0;
  this.x = 0;
  this.y = 0;
  this.hidden = true;
  this.draw = function(ctx) {
    var xOffset, yOffset;
    switch (this.value) {
      case 'A':
        xOffset = 1;
        break;
      case 'J':
        xOffset = 1 + 10 * 73;
        break;
      case 'Q':
        xOffset = 1 + 11 * 73;
        break;
      case 'K':
        xOffset = 1 + 12 * 73;
        break;
      default:
        xOffset = 1 + (parseInt(this.value) - 1) * 73;
    }

    switch (this.suit) {
      case 'C':
        yOffset = 1;
        break;
      case 'S':
        yOffset = 99;
        break;
      case 'H':
        yOffset = 197;
        break;
      case 'D':
        yOffset = 295;
        break;
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.rotation !== 0) {
      ctx.rotate(this.rotation);
    }
    ctx.drawImage(window.CARDSIMAGE, xOffset, yOffset, 71, 96, -(71 / 2), -(96 / 2), 71, 96);
    ctx.restore();
  };
};
},{}],3:[function(require,module,exports){
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
},{"./card":2,"./shuffle":4}],4:[function(require,module,exports){
module.exports = {
  shuffle: function (toShuffle) {
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
  }
};


},{}]},{},[1])