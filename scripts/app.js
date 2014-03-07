/* global Game */
 
var app = {
  game: new Game(),
  leftShift: 0,
  screenWidth: window.screen.availWidth,
  screenHeight: window.screen.availHeight,
  cardWidth: 142,
  cardHeight: 199
};

setTimeout(function() {
  app.game.deal();
}, 100);
