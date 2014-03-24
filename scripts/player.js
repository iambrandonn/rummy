/* globals app, states */
/* exported Player */

function Player(isComputer) {
  this.hand = null;
  this.isComputer = isComputer;
  this.score = 0;

  this.shouldChoose = function(cardShowing) {
    // If it will get you a meld, do it
    if (this.hand.wouldResultInMeld(cardShowing)) {
      return true;
    }
    // If you have no cards near it, don't
    else if (!this.hand.hasThisNumberCard(cardShowing) && !this.hand.hasCardNearThis(cardShowing)) {
      return false;
    }
    else {
      // Otherwise, pick randomly
      return Math.random() > 0.5;
    }
  };

  this.autoPlay = function() {
    var that = this;
    var layedDown = this.hand.layDownMelds();
    app.game.layout();
    var delay = layedDown ? app.animationTime : 0;

    setTimeout(function() {
      if (that.shouldChoose(app.game.discards[app.game.discards.length - 1])) {
        that.draw(app.game.discards[app.game.discards.length - 1]);
      }
      else {
        that.draw(app.game.stock[app.game.stock.length - 1]);
      }

      setTimeout(function() {
        that.discard(that.hand.chooseDiscard());

        app.game.layout();
      }, app.animationTime);
    }, delay);
  };

  this.draw = function(card) {
    var that = this;

    app.game.state = null;
    if (card === app.game.discards[app.game.discards.length - 1]) {
      this.drawFromDiscards();
    }
    else if (card === app.game.stock[app.game.stock.length - 1]) {
      this.drawFromStock();
    }
    else {
      app.game.state = states.DRAW;
      return;
    }

    app.game.layout();

    setTimeout(function() {
      that.hand.layDownMelds();
      app.game.layout();
      if (that.hand.cards.length === 0) {
        app.game.state = null;
        app.game.toggleTurn();
      }
      else {
        app.game.state = states.DISCARD;
      }
    }, app.animationTime);
  };

  this.drawFromStock = function() {
    if (app.game.stock.length > 0) {
      var card = app.game.stock.pop();
      this.hand.addCard(card);
    }
  };

  this.drawFromDiscards = function() {
    if (app.game.discards.length > 0) {
      var card = app.game.discards.pop();
      this.hand.addCard(card);
    }
  };

  this.discard = function(card) {
    app.game.state = null;
    var playerIndex;
    if (app.game.computerTurn) {
      playerIndex = 1;
    }
    else {
      playerIndex = 0;
    }

    var placeInHand = this.hand.indexOf(card.suit, card.numericRank);

    if (placeInHand >= 0) {
      this.hand.cards.splice(placeInHand, 1);
      app.game.discards.push(card);
      card.show();
      app.game.state = states.DRAW;
      app.game.toggleTurn();
    }
    else {
      app.game.state = states.DISCARD;
    }
  };
}