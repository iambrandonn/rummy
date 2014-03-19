/* global Deck, app, Hand, states */
/* exported Game */

function Game() {
  this.deck = new Deck();
  this.discards = [];
  this.stock = [];
  this.melds = [];
  this.computerTurn = false;
  this.state = null;

  this.toggleTurn = function() {
    var that = this;
    setTimeout(function() {
      that.computerTurn = !that.computerTurn;
      if (that.computerTurn) {
        app.players[1].autoPlay();
      }
    }, app.animationTime);
  };

  // Call this to update the display
  this.layout = function() {
    if (this.melds.length > 0) {
      this.centerHandsOn(0.65);
    }
    else {
      this.centerHandsOn(0.5);
    }
    this.layoutMelds();
    this.layoutStock();
    this.layoutDiscards();
    app.players[0].hand.layout();
    app.players[1].hand.layout();
  };

  // This will change where the players hands are centered around.
  this.centerHandsOn = function(percent) {
    app.handsCenteredOn = percent;
  };

  this.deal = function() {
    // To begin, every card from the deck is in the stock
    this.stock = this.deck.cards.slice(0);

    // Each player gets 10 cards in their hand
    app.players[0].hand = new Hand(this.stock.splice(0, 10), false);
    app.players[0].hand.order();
    app.players[1].hand = new Hand(this.stock.splice(0, 10), true);
    app.players[1].hand.order();

    // Update the display according to the deal
    this.layout();

    // Wait for initial layout to finish
    setTimeout(function() {
      // Put the first card into the discard pile
      app.game.discards.push(app.game.stock.pop());

      // Just render the discards
      app.game.layoutDiscards();

      // Wait for the card to be moved onto the discard pile
      setTimeout(function() {
        // Turn over the card
        app.game.discards[0].show();

        // Start the game
        app.game.start();
      }, app.animationTime + 50);
    }, app.animationTime + 50);
  };

  this.start = function() {
    if (app.computerGoesFirst) {
      app.players[1].autoPlay();
    }
    else {
      this.state = states.DRAW;
    }
  };

  this.layoutStock = function() {
    for (var stockIndex = 0; stockIndex < this.stock.length; stockIndex++) {
      this.stock[stockIndex].updateLayout(
        (app.screenWidth * app.handsCenteredOn) - 100 - (app.cardWidth / 2),
        app.stockY,
        0
      );
    }
  };

  this.layoutDiscards = function() {
    var zIndex = 10;
    for (var i = 0; i < app.game.discards.length; i++) {
      app.game.discards[i].updateLayout(
        (app.screenWidth * app.handsCenteredOn) + 100 - (app.cardWidth / 2),
        app.stockY,
        0
      );
      app.game.discards[i].setZ(zIndex++);
    }
  };

  this.layoutMelds = function() {
    var yDistance = (app.screenHeight - 30) / this.melds.length;
    var currentMeldY = 15;
    var zIndex = 10;
    var cardScale;
    var cardOffset;
    if (this.melds.length < 4) {
      cardScale = 0.9;
      cardOffset = 10;
    }
    else if (this.melds.length < 6) {
      cardScale = 0.7;
      cardOffset = 42;
    }
    else {
      cardScale = 0.62;
      cardOffset = 45;
    }

    for (var meldIndex in this.melds) {
      var currentCardX = 40;
      for(var cardIndex in this.melds[meldIndex]) {
        this.melds[meldIndex][cardIndex].updateLayout(currentCardX, currentMeldY, 0, cardScale);
        this.melds[meldIndex][cardIndex].setZ(zIndex++);
        this.melds[meldIndex][cardIndex].element.classList.remove('computerHand');
        this.melds[meldIndex][cardIndex].element.classList.remove('playerHand');
        this.melds[meldIndex][cardIndex].element.classList.add('meld');
        this.melds[meldIndex][cardIndex].show();
        currentCardX += 23;
      }

      if (yDistance > app.cardHeight - cardOffset) {
        currentMeldY += app.cardHeight - cardOffset;
      }
      else {
        currentMeldY += yDistance;
      }
    }
  };
}