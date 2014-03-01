/* global TweenLite, Power3 */

var canvas = document.getElementById('game');
var backgroundCanvas = document.getElementById('background');
var ctx = canvas.getContext('2d');
var backgroundCtx = backgroundCanvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

window.CARDBACKIMAGE = new Image();
window.CARDBACKIMAGE.src = 'back.gif';

window.CARDSIMAGE = new Image();
window.CARDSIMAGE.src = 'cards.png';
window.CARDSIMAGE.onload = function() {
  window.currentCard = 0;
  var interval = setInterval(function() {
    if (Math.random() > 0.5) {
      deck.cards[window.currentCard].hidden = false;
    }
    TweenLite.to(deck.cards[window.currentCard], 0.7, {x: Math.random() * 1000, ease: Power3.easeInOut});
    TweenLite.to(deck.cards[window.currentCard], 0.7, {y: Math.random() * 750, ease: Power3.easeInOut});
    TweenLite.to(deck.cards[window.currentCard], 0.7, {rotation: Math.PI, ease: Power3.easeInOut});
    if (window.currentCard < deck.cards.length - 1) {
      window.currentCard++;
    }
    else {
      clearInterval(interval);
    }
  }, 50);

  window.requestAnimationFrame(paint);
};

var paint = function() {
  // Clear the screen
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Paint each card
  for (var i = 0; i < deck.cards.length; i++) {
    deck.cards[i].draw(ctx);
  }

  window.requestAnimationFrame(paint);
};

var deck = require('./deck');
deck.init();

// Draw background
var wood = new Image();
wood.src = 'altwood.jpg';
wood.onload = function() {
  var pattern = backgroundCtx.createPattern(wood, 'repeat');
  backgroundCtx.fillStyle = pattern;
  backgroundCtx.fillRect(0, 0, canvasWidth, canvasHeight);
};

// // var container = $(c).parent();

// //Run function when browser resizes
// // $(window).resize( respondCanvas );

// function respondCanvas(){ 
//     canvas.width = $(container).width(); //max width
//     canvas.height = $(container).height(); //max width
// }

//Initial call 
// respondCanvas();
