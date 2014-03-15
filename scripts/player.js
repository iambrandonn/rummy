/* globals app */
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
      app.game.playerDraw(app.game.stock[app.game.stock.length - 1]);

      setTimeout(function() {
        console.error('logic here to figure out AI of which card to discard');

        that.hand.playerDiscard(that.hand.cards[0]);

        app.game.layout();
      }, app.animationTime);
    }, delay);
  };
}