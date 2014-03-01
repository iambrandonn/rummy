/* global Deck */

function Game() {
  this.players = [];
  this.deck = new Deck();
  this.deal = function() {
    
  };
  this.paint = function() {
    var ctx = window.app.ctx;

    // Clear the screen
    ctx.clearRect(0, 0, window.app.canvasWidth, window.app.canvasHeight);

    // Paint each card
    for (var i = 0; i < this.deck.cards.length; i++) {
      this.deck.cards[i].draw(ctx);
    }
  };
}