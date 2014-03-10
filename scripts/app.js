/* global Game */
 
var app = {
  game: new Game(),
  handsCenteredOn: 0.5,
  cardWidth: 142,
  cardHeight: 199,
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight
};

setTimeout(function() {
  app.game.deal();
}, 100);

window.addEventListener('resize:end', function() {
  app.screenWidth = window.innerWidth;
  app.screenHeight = window.innerHeight;

  app.game.layout();
}, false);