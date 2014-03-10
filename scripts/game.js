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

  this.layout = function() {
    this.layoutStock();
    this.layoutDiscards();

    this.players[0].hand.layout();
    this.players[1].hand.layout();
  };

  this.centerHandsOn = function(percent) {
    app.handsCenteredOn = percent;
    this.layout();
  };

  this.deal = function() {
    this.stock = this.deck.cards.slice(0);
    this.players[0].hand = new Hand(this.stock.splice(0, 10), false);
    this.players[0].hand.order();
    this.players[1].hand = new Hand(this.stock.splice(0, 10), true);
    this.players[1].hand.order();
    this.layout();

    setTimeout(function() {
      app.game.discards.push(app.game.stock.pop());
      app.game.layoutDiscards();
      setTimeout(function() {
        app.game.discards[0].show();
        app.game.players[0].hand.layDownMelds();
        app.game.players[1].hand.layDownMelds();
      }, 750);
    }, 750);
  };

  this.layoutStock = function() {
    for (var stockIndex = 0; stockIndex < this.stock.length; stockIndex++) {
      this.stock[stockIndex].updateLayout(
        (app.screenWidth * app.handsCenteredOn) - 100 + (Math.random() * 4) - 2 - (app.cardWidth / 2),
        250,
        Math.random() * 2 - 1
      );
    }
  };

  this.layoutDiscards = function() {
    for (var i = 0; i < app.game.discards.length; i++) {
      app.game.discards[i].updateLayout(
        (app.screenWidth * app.handsCenteredOn) + 100 + (Math.random() * 4) - 2 - (app.cardWidth / 2),
        250,
        0
      );
    }
  };
}