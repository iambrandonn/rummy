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
