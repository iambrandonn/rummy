/* global Game, states, Player */
 
var app = {
  computerGoesFirst: false,
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
  animationTime: 600,
  players: [
    new Player(false),
    new Player(true)
  ],
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
  },
  init: function() {
    // Load the card images and then start the game
    var cardImage = new Image();
    cardImage.onload = function() {
      app.updateLayoutVariables();
      app.game.deal();
    };
    cardImage.src = 'cards.png';

    // When the browser resizes we need to update our layout
    window.addEventListener('resize:end', function() {
      app.updateLayoutVariables();
      app.game.layout();
    }, false);

    document.addEventListener('cardClicked', function(e) {
      // Nothing should happend unless it is the players turn
      if (!app.game.computerTurn) {
        // Depending on what we are waiting for, react appropriately
        switch (app.game.state) {
          case states.DRAW:
            app.game.playerDraw(e.card);
            break;
          case states.DISCARD:
            app.players[0].hand.playerDiscard(e.card);
            app.game.layout();
            break;
        }
      }
    });
  }
};

app.init();