/* global Game, TweenLite, Power3 */

window.app = {
  canvasElement: document.getElementById('game'),
  backgroundCanvas: document.getElementById('background'),
  CARDBACKIMAGE: new Image(),
  CARDSIMAGE: new Image(),
  wood: new Image(),
  game: new Game()
};

window.app.ctx = window.app.canvasElement.getContext('2d');
window.app.backgroundCtx = window.app.backgroundCanvas.getContext('2d');
window.app.canvasWidth = window.app.canvasElement.width;
window.app.canvasHeight = window.app.canvasElement.height;
window.app.CARDBACKIMAGE.src = 'back.gif';
window.app.CARDSIMAGE.src = 'cards.png';

var loaded = 0;
var resourceCount = 2;

window.app.CARDSIMAGE.onload = function() {
  loaded++;
  if (loaded === resourceCount) {
    startApp();
  }
};

// Draw background
window.app.wood.src = 'altwood.jpg';
window.app.wood.onload = function() {
  var pattern = window.app.backgroundCtx.createPattern(window.app.wood, 'repeat');
  window.app.backgroundCtx.fillStyle = pattern;
  window.app.backgroundCtx.fillRect(0, 0, window.app.canvasWidth, window.app.canvasHeight);

  loaded++;
  if (loaded === resourceCount) {
    startApp();
  }
};

function startApp() {
  var currentCard = 0;
  var interval = setInterval(function() {
    if (Math.random() > 0.5) {
      window.app.game.deck.cards[currentCard].hidden = false;
    }
    TweenLite.to(window.app.game.deck.cards[currentCard], 0.7, {x: Math.random() * 1000, ease: Power3.easeInOut});
    TweenLite.to(window.app.game.deck.cards[currentCard], 0.7, {y: Math.random() * 750, ease: Power3.easeInOut});
    TweenLite.to(window.app.game.deck.cards[currentCard], 0.7, {rotation: Math.random() * Math.PI, ease: Power3.easeInOut});
    if (currentCard < window.app.game.deck.cards.length - 1) {
      currentCard++;
    }
    else {
      clearInterval(interval);
    }
  }, 1);
}

function paint() {
  window.app.game.paint();
  window.requestAnimationFrame(paint);
}

paint();


// // var container = $(c).parent();

// //Run function when browser resizes
// // $(window).resize( respondCanvas );

// function respondCanvas(){ 
//     canvas.width = $(container).width(); //max width
//     canvas.height = $(container).height(); //max width
// }

//Initial call 
// respondCanvas();
