/* global Deck, app, Player, Hand, states */
/* exported Game */

function Game() {
  this.players = [
    new Player(false),
    new Player(true)
  ];
  this.deck = new Deck();
  this.discards = [];
  this.stock = [];
  this.melds = [];

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

    this.players[0].hand.layout();
    this.players[1].hand.layout();
  };

  this.centerHandsOn = function(percent) {
    app.handsCenteredOn = percent;
  };

  this.deal = function() {
    this.stock = this.deck.cards.slice(0);
    this.players[0].hand = new Hand(this.stock.splice(0, 10), false);
    this.players[0].hand.order();
    this.players[1].hand = new Hand(this.stock.splice(0, 10), true);
    this.players[1].hand.order();

    this.layout();

    // Wait for initial layout to finish
    setTimeout(function() {
      // Put the first card into the discard pile
      app.game.discards.push(app.game.stock.pop());
      app.game.layoutDiscards();

      setTimeout(function() {
        // Turn over the card
        app.game.discards[0].show();

        if (app.computerTurn) {
          console.error('finish this');
          app.game.players[1].hand.layDownMelds();
        }
        else {
          app.game.layout();
          app.state = states.DRAW;
        }
      }, app.animationTime);
    }, app.animationTime);
  };

  this.playerDraw = function(card) {
    var playerIndex;
    if (app.computerTurn) {
      playerIndex = 1;
    }
    else {
      playerIndex = 0;
    }

    app.state = null;
    if (card === app.game.discards[app.game.discards.length - 1]) {
      app.game.drawFromDiscards(app.game.players[playerIndex]);
    }
    else if (card === app.game.stock[app.game.stock.length - 1]) {
      app.game.drawFromStock(app.game.players[playerIndex]);
    }
    else {
      app.state = states.DRAW;
      return;
    }

    app.game.layout();

    setTimeout(function() {
      app.game.players[playerIndex].hand.layDownMelds();
      app.game.layout();

      app.state = states.DISCARD;
    }, app.animationTime);
  };

  this.drawFromStock = function(player) {
    if (this.stock.length > 0) {
      var card = this.stock.pop();
      player.hand.addCard(card);
      card.log();
    }
  };

  this.drawFromDiscards = function(player) {
    if (this.discards.length > 0) {
      var card = this.discards.pop();
      player.hand.addCard(card);
      card.log();
    }
  };

  this.layoutStock = function() {
    for (var stockIndex = 0; stockIndex < this.stock.length; stockIndex++) {
      this.stock[stockIndex].updateLayout(
        (app.screenWidth * app.handsCenteredOn) - 100 - (app.cardWidth / 2),
        app.stockY,
        0//Math.random() * 2 - 1
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
    var cardScale = this.melds.length > 3 ? 0.7 : 0.9;
    var cardOffset = this.melds.length > 3 ? 42 : 10;

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