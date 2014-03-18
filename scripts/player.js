/* globals app, states */
/* exported Player */

function Player(isComputer) {
  this.hand = null;
  this.isComputer = isComputer;

  this.autoPlay = function() {
    var that = this;
    var layedDown = this.hand.layDownMelds();
    app.game.layout();
    var delay = layedDown ? app.animationTime : 0;

    setTimeout(function() {
      console.error('logic here to figure out AI of when to draw from which pile');
      that.draw(app.game.stock[app.game.stock.length - 1]);

      setTimeout(function() {
        console.error('logic here to figure out AI of which card to discard');

        that.hand.playerDiscard(that.hand.cards[0]);

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
      app.game.state = states.DISCARD;
    }, app.animationTime);
  };

  this.drawFromStock = function() {
    if (app.game.stock.length > 0) {
      var card = app.game.stock.pop();
      this.hand.addCard(card);
      card.log();
    }
  };

  this.drawFromDiscards = function() {
    if (app.game.discards.length > 0) {
      var card = app.game.discards.pop();
      this.hand.addCard(card);
      card.log();
    }
  };

}