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

  this.deal = function() {
    this.stock = this.deck.cards.slice(0);
    this.players[0].hand = new Hand(this.stock.splice(0, 10));
    this.players[1].hand = new Hand(this.stock.splice(0, 10));
    this.players[0].hand.order();
    this.players[1].hand.order();

    this.discards = this.stock.splice(0, 1);

    this.players[0].hand.layout(this.players[0].computer);
    this.players[1].hand.layout(this.players[1].computer);
  };

  this.paint = function() {
    var ctx = window.app.ctx;

    // Clear the screen
    ctx.clearRect(0, 0, app.canvasWidth, app.canvasHeight);

    // Paint each hand
    if (this.players[0].hand) {
      for (var cardIndex = 0; cardIndex < this.players[0].hand.cards.length; cardIndex++) {
        this.players[0].hand.cards[cardIndex].paint(ctx);
      }
      for (cardIndex = this.players[1].hand.cards.length - 1; cardIndex >= 0 ; cardIndex--) {
        this.players[1].hand.cards[cardIndex].paint(ctx);
      }
    }

    // Paint stock
    for (var stockIndex = 0; stockIndex < this.stock.length; stockIndex++) {
      this.stock[stockIndex].paint(ctx);
    }

    // Paint discards
    for (var discardIndex = 0; discardIndex < this.discards.length; discardIndex++) {
      this.discards[discardIndex].paint(ctx);
    }
  };
}