// var deck = require('./shuffle');

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

var SUITS = {
  CLUBS: 0,
  SPADES: 1,
  HEARTS: 2,
  DIAMONDS: 3
};

var deck = [
  {suit: SUITS.CLUBS, value: 'A'},
  {suit: SUITS.CLUBS, value: '2'},
  {suit: SUITS.CLUBS, value: '3'},
  {suit: SUITS.CLUBS, value: '4'},
  {suit: SUITS.CLUBS, value: '5'},
  {suit: SUITS.CLUBS, value: '6'},
  {suit: SUITS.CLUBS, value: '7'},
  {suit: SUITS.CLUBS, value: '8'},
  {suit: SUITS.CLUBS, value: '9'},
  {suit: SUITS.CLUBS, value: '10'},
  {suit: SUITS.CLUBS, value: 'J'},
  {suit: SUITS.CLUBS, value: 'Q'},
  {suit: SUITS.CLUBS, value: 'K'},
  {suit: SUITS.SPADES, value: 'A'},
  {suit: SUITS.SPADES, value: '2'},
  {suit: SUITS.SPADES, value: '3'},
  {suit: SUITS.SPADES, value: '4'},
  {suit: SUITS.SPADES, value: '5'},
  {suit: SUITS.SPADES, value: '6'},
  {suit: SUITS.SPADES, value: '7'},
  {suit: SUITS.SPADES, value: '8'},
  {suit: SUITS.SPADES, value: '9'},
  {suit: SUITS.SPADES, value: '10'},
  {suit: SUITS.SPADES, value: 'J'},
  {suit: SUITS.SPADES, value: 'Q'},
  {suit: SUITS.SPADES, value: 'K'},
  {suit: SUITS.HEARTS, value: 'A'},
  {suit: SUITS.HEARTS, value: '2'},
  {suit: SUITS.HEARTS, value: '3'},
  {suit: SUITS.HEARTS, value: '4'},
  {suit: SUITS.HEARTS, value: '5'},
  {suit: SUITS.HEARTS, value: '6'},
  {suit: SUITS.HEARTS, value: '7'},
  {suit: SUITS.HEARTS, value: '8'},
  {suit: SUITS.HEARTS, value: '9'},
  {suit: SUITS.HEARTS, value: '10'},
  {suit: SUITS.HEARTS, value: 'J'},
  {suit: SUITS.HEARTS, value: 'Q'},
  {suit: SUITS.HEARTS, value: 'K'},
  {suit: SUITS.DIAMONDS, value: 'A'},
  {suit: SUITS.DIAMONDS, value: '2'},
  {suit: SUITS.DIAMONDS, value: '3'},
  {suit: SUITS.DIAMONDS, value: '4'},
  {suit: SUITS.DIAMONDS, value: '5'},
  {suit: SUITS.DIAMONDS, value: '6'},
  {suit: SUITS.DIAMONDS, value: '7'},
  {suit: SUITS.DIAMONDS, value: '8'},
  {suit: SUITS.DIAMONDS, value: '9'},
  {suit: SUITS.DIAMONDS, value: '10'},
  {suit: SUITS.DIAMONDS, value: 'J'},
  {suit: SUITS.DIAMONDS, value: 'Q'},
  {suit: SUITS.DIAMONDS, value: 'K'},
];

// // var container = $(c).parent();

// //Run function when browser resizes
// // $(window).resize( respondCanvas );

// function respondCanvas(){ 
//     canvas.width = $(container).width(); //max width
//     canvas.height = $(container).height(); //max width
// }

//Initial call 
// respondCanvas();
ctx.fillStyle = 'green';

var cards = new Image();
cards.src = 'cards.png';
cards.onload = function() {
  var count = 0;
  var currentAngle = 0;
  ctx.save();

  var go = function() {
    ctx.restore();
    ctx.save();

    // Clear the screen
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // start drawing in the middle again
    ctx.translate(300, 300);
    ctx.rotate(currentAngle);

    drawCard(deck[44], 300, 400);  // 8 of hearts
    
    count++;
    currentAngle += Math.PI / 180;
    if (count < 200) {
      requestAnimationFrame(go);
    }
  };

  requestAnimationFrame(go);
};

function drawCard(card, width, height) {
  var xOffset, yOffset;
  switch (card.value) {
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
      xOffset = 1 + (parseInt(card.value) - 1) * 73;
  }

  switch (card.suit) {
    case SUITS.CLUBS: 
      yOffset = 1;
      break;
    case SUITS.SPADES: 
      yOffset = 99;
      break;
    case SUITS.HEARTS: 
      yOffset = 197;
      break;
    case SUITS.DIAMONDS: 
      yOffset = 295;
      break;
  }
  // ctx.drawImage(cards, xOffset, yOffset, 71, 96, 0, 0, width, height);
  ctx.drawImage(cards, xOffset, yOffset, 71, 96, -150, -200, width, height);
}