/* global Deck, app, Player, Hand, TweenLite */
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
      TweenLite.to(app.game.discards[0], app.animationTime, {x: 600 + app.leftShift, ease: app.easing});
      TweenLite.to(app.game.discards[0], app.animationTime, {y: 350, ease: app.easing});
      setTimeout(function() {
        app.game.discards[0].hidden = false;
        app.game.players[0].hand.layDownMelds();
      }, app.animationTime * 1000);
    }, app.animationTime * 1000);

    this.players[0].hand.order();
    this.players[1].hand.order();

    this.players[0].hand.layout();
    this.players[1].hand.layout();
  };

  this.placeStock = function() {
    for (var stockIndex = 0; stockIndex < this.stock.length; stockIndex++) {
      TweenLite.to(this.stock[stockIndex], app.animationTime, {x: 400 + app.leftShift + (Math.random() * 4) - 2, ease: app.easing});
      TweenLite.to(this.stock[stockIndex], app.animationTime, {y: 350, ease: app.easing});
    }
  };

  this.placeDiscards = function() {
    for (var i = 0; i < app.game.discards.length; i++) {
      TweenLite.to(app.game.discards[i], app.animationTime, {x: 600 + app.leftShift, ease: app.easing});
      TweenLite.to(app.game.discards[i], app.animationTime, {y: 350, ease: app.easing});
    }
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