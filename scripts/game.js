/* global Deck, app, Hand, states, domMap */
/* exported Game */

function Game() {
  this.type = 'Game';
  this.deck = new Deck();
  this.discards = [];
  this.stock = [];
  this.melds = [];
  this.computerTurn = false;
  this.state = null;

  var stockArrowX, stockArrowY, discardArrowX, discardArrowY;

  this.finishHand = function() {
    // update scores
    if (app.players[0].hand.cards.length === 0) {
      app.players[1].score += app.players[1].hand.getScore();
    }
    else if (app.players[1].hand.cards.length === 0) {
      app.players[0].score += app.players[0].hand.getScore();
    }
    app.updateScoreDOM();

    // Show computers hand if any cards left
    app.opponentY += 125;
    app.game.layout();
    app.players[1].hand.show();

    if (app.players[0].score >= 100 || app.players[1].score >= 100) {
      app.showWinnerModal();
    }
    else {
      app.showContinueModal();
    }
  };

  this.nextHand = function() {
    app.opponentY -= 125;
    app.computerGoesFirst = !app.computerGoesFirst;

    for (var cardIndex in this.deck.cards) {
      this.deck.cards[cardIndex].removeCustomClass('meld');
      this.deck.cards[cardIndex].hide();
    }
    this.discards = [];
    this.melds = [];
    app.players[0].hand.empty();
    app.players[1].hand.empty();
    this.stock = this.deck.cards.slice(0);

    setTimeout(function() {
      app.game.deal();
    }, app.animationTime);

    app.game.layout();
    this.deck.shuffle();
  };

  this.toggleTurn = function() {
    var that = this;

    app.saveState();
    
    setTimeout(function() {
      that.computerTurn = !that.computerTurn;

      // check for a winner
      if (app.players[0].hand.cards.length === 0 || app.players[1].hand.cards.length === 0) {
        that.finishHand();
      }
      else {
        if (that.computerTurn) {
          app.players[1].autoPlay();
        }
        else {
          that.state = states.DRAW;
          that.updateHintArrows();
        }
      }
    }, app.animationTime);
  };

  // Call this to update the display
  this.layout = function() {
    if (this.melds.length > 0) {
      if (app.handsCenteredOn !== 0.56) {
        this.centerHandsOn(0.53);
        domMap.computerScore.classList.add('recentered');
        domMap.playerScore.classList.add('recentered');
      }
    }
    else {
      if (app.handsCenteredOn !== 0.5) {
        this.centerHandsOn(0.5);
        domMap.computerScore.classList.remove('recentered');
        domMap.playerScore.classList.remove('recentered');
      }
    }
    this.layoutMelds();
    this.layoutStock();
    this.layoutDiscards();
    app.players[0].hand.layout();
    app.players[1].hand.layout();
    this.layoutHintArrows();
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
      this.computerTurn = true;
      app.players[1].autoPlay();
    }
    else {
      this.computerTurn = false;
      this.state = states.DRAW;
      this.updateHintArrows();
    }
  };

  this.layoutStock = function() {
    var zIndex = 10;
    for (var stockIndex = 0; stockIndex < this.stock.length; stockIndex++) {
      this.stock[stockIndex].updateLayout(
        (app.screenWidth * app.handsCenteredOn) - 100 - (app.cardWidth / 2),
        app.stockY,
        0
      );
      app.game.stock[stockIndex].setZ(zIndex++);
    }
  };

  this.layoutHintArrows = function() {
    // Stock hint arrow
    var newX = (app.screenWidth * app.handsCenteredOn) - 95;
    var newY = app.stockY + 220;

    if (stockArrowX !== newX) {
      domMap.stockArrow.style.left = newX  + 'px';
      stockArrowX = newX;
    }

    if (stockArrowY !== newY) {
      domMap.stockArrow.style.top = newY + 'px';
      stockArrowY = newY;
    }

    // Discard hint arrow
    newX = (app.screenWidth * app.handsCenteredOn) + 90 - (app.cardWidth / 3);

    if (discardArrowX !== newX) {
      domMap.discardArrow.style.left = newX + 'px';
      discardArrowX = newX;
    }

    if (discardArrowY !== newY) {
      domMap.discardArrow.style.top = newY + 'px';
      discardArrowY = newY;
    }
  };

  this.updateHintArrows = function() {
    if (app.game.state === states.DRAW) {
      domMap.stockArrow.style.opacity = '1';
      domMap.discardArrow.style.opacity = '1';
      domMap.discardArrow.classList.remove('rotated');
    }
    else if (app.game.state === states.DISCARD) {
      domMap.stockArrow.style.opacity = '0';
      domMap.discardArrow.style.opacity = '1';
      domMap.discardArrow.classList.add('rotated');
    }
    else {
      domMap.stockArrow.style.opacity = '0';
      domMap.discardArrow.style.opacity = '0';
      domMap.discardArrow.classList.remove('rotated');
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
    else if (this.melds.length < 5) {
      cardScale = 0.7;
      cardOffset = 40;
    }
    else if (this.melds.length < 6) {
      cardScale = 0.6;
      cardOffset = 53;
    }
    else {
      cardScale = 0.5;
      cardOffset = 60;
    }

    for (var meldIndex in this.melds) {
      var currentCardX = 40;
      for(var cardIndex in this.melds[meldIndex]) {
        this.melds[meldIndex][cardIndex].updateLayout(currentCardX, currentMeldY, 0, cardScale);
        this.melds[meldIndex][cardIndex].setZ(zIndex++);
        this.melds[meldIndex][cardIndex].removeCustomClass('computerHand');
        this.melds[meldIndex][cardIndex].removeCustomClass('playerHand');
        this.melds[meldIndex][cardIndex].addCustomClass('meld');
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