/* global Deck, app, Player, Hand */
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

  this.scootOver = function(newAmount) {
    app.leftShift = newAmount;

    this.placeStock();
    this.placeDiscards();

    this.players[0].hand.layout();
    this.players[1].hand.layout();
  };

  this.deal = function() {
    this.stock = this.deck.cards.slice(0);
    this.players[0].hand = new Hand(this.stock.splice(0, 10), false);
    this.players[1].hand = new Hand(this.stock.splice(0, 10), true);

    this.placeStock();
    setTimeout(function() {
      app.game.discards.push(app.game.stock.pop());
      app.game.discards[0].updateLayout(app.screenWidth  * 0.6 + app.leftShift - (app.cardWidth / 2), 250, 0);
      setTimeout(function() {
        app.game.discards[0].show();
        app.game.players[0].hand.layDownMelds();
        app.game.players[1].hand.layDownMelds();
      }, 750);
    }, 750);

    this.players[0].hand.order();
    this.players[1].hand.order();

    this.players[0].hand.layout();
    this.players[1].hand.layout();
  };

  this.placeStock = function() {
    for (var stockIndex = 0; stockIndex < this.stock.length; stockIndex++) {
      this.stock[stockIndex].updateLayout(
        app.screenWidth * 0.4 + app.leftShift + (Math.random() * 4) - 2 - (app.cardWidth / 2),
        250,
        Math.random() * 2 - 1
      );
    }
  };

  this.placeDiscards = function() {
    for (var i = 0; i < app.game.discards.length; i++) {
      app.game.discards[i].updateLayout(
        600 + app.leftShift,
        350,
        0
      );
    }
  };
}