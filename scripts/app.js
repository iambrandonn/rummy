/* global Game, Power3, requestAnimationFrame */
 
var app = {
  canvasElement: document.getElementById('game'),
  backgroundCanvas: document.getElementById('background'),
  CARDSIMAGE: new Image(),
  wood: new Image(),
  game: new Game(),
  ctx: null,
  backgroundCtx: null,
  canvasWidth: null,
  canvasHeight: null,
  animationTime: 0.7,
  easing: Power3.easeInOut,
  leftShift: 0
};

app.ctx = app.canvasElement.getContext('2d');
app.ctx.strokeStyle = '#300';
app.ctx.lineWidth = 1;
app.backgroundCtx = app.backgroundCanvas.getContext('2d');
app.canvasWidth = app.canvasElement.width;
app.canvasHeight = app.canvasElement.height;
app.CARDSIMAGE.src = 'cardso.png';

var loaded = 0;
var resourceCount = 2;

app.CARDSIMAGE.onload = function() {
  loaded++;
  if (loaded === resourceCount) {
    startApp();
  }
};

// Draw background
app.wood.src = 'wood.jpg';
app.wood.onload = function() {
  var pattern = app.backgroundCtx.createPattern(app.wood, 'repeat');
  app.backgroundCtx.fillStyle = pattern;
  app.backgroundCtx.fillRect(0, 0, app.canvasWidth, app.canvasHeight);

  loaded++;
  if (loaded === resourceCount) {
    startApp();
  }
};

function startApp() {
  app.game.deal();

  // var currentCard = 0;
  // var interval = setInterval(function() {
  //   if (Math.random() > 0.5) {
  //     app.game.deck.cards[currentCard].hidden = false;
  //   }
  //   TweenLite.to(app.game.deck.cards[currentCard], 0.7, {x: Math.random() * 1000, ease: Power3.easeInOut});
  //   TweenLite.to(app.game.deck.cards[currentCard], 0.7, {y: Math.random() * 750, ease: Power3.easeInOut});
  //   TweenLite.to(app.game.deck.cards[currentCard], 0.7, {rotation: Math.random() * Math.PI, ease: Power3.easeInOut});
  //   if (currentCard < app.game.deck.cards.length - 1) {
  //     currentCard++;
  //   }
  //   else {
  //     clearInterval(interval);
  //   }
  // }, 1);
}

function paint() {
  app.game.paint();
  requestAnimationFrame(paint);
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
