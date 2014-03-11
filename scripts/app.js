/* global Game */
 
var app = {
  game: new Game(),
  handsCenteredOn: 0.5,
  cardWidth: 142,
  cardHeight: 199,
  screenWidth: null,
  screenHeight: null,
  stockY: null,
  playerY: null,
  opponentY: null,
  computerTurn: false,
  updateLayoutVariables: function() {
    app.screenWidth = window.innerWidth;
    app.screenHeight = window.innerHeight;

    // Set PlayerY
    if (app.screenHeight < 513) {
      app.playerY = app.screenHeight - app.cardHeight + 30;
    }
    else {
      app.playerY = app.screenHeight - app.cardHeight - 30;
    }

    // Set OpponentY
    if (app.screenHeight < 506) {
      app.opponentY = -175;
    }
    else if (app.screenHeight >= 506 && app.screenHeight < 578) {
      app.opponentY = -150;
    }
    else {
      app.opponentY = -100;
    }
    
    // Set StockY
    if (app.screenHeight < 506) {
      app.stockY = 50;
    }
    else if (app.screenHeight >= 506 && app.screenHeight < 578) {
      app.stockY = 85;
    }
    else if (app.screenHeight >= 578 && app.screenHeight < 625) {
      app.stockY = 135;
    }
    else if (app.screenHeight >= 625 && app.screenHeight < 680) {
      app.stockY = 170;
    }
    else if (app.screenHeight >= 680 && app.screenHeight < 750) {
      app.stockY = 210;
    }
    else {
      app.stockY = 250;
    }
  }
};

setTimeout(function() {
  app.updateLayoutVariables();
  app.game.deal();
}, 100);

window.addEventListener('resize:end', function() {
  app.updateLayoutVariables();
  app.game.layout();
}, false);

