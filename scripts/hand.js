/* global TweenLite, app */
/* exported Hand */

function Hand(cards) {
  this.cards = cards;
  this.order = function() {
    // order by rank
    if (Array.isArray(this.cards)) {
      this.cards.sort(function(a, b) {
        if (a.numericRank > b.numericRank) {
          return 1;
        }
        else if (a.numericRank === b.numericRank) {
          return 0;
        }
        else {
          return -1;
        }
      });
    }
  };

  this.layout = function(computer) {
    var isOdd = (this.cards.length & 1) === 1;
    var SPACE_BETWEEN_CARDS = 30;
    var cardsOnEachSide;
    var xValue;
    if (isOdd) {
      cardsOnEachSide = (this.cards.length - 1) / 2;
      xValue = (app.canvasWidth / 2) - (SPACE_BETWEEN_CARDS * cardsOnEachSide); // Find starting point
    }
    else {
      cardsOnEachSide = (this.cards.length) / 2;
      xValue = (app.canvasWidth / 2) - (SPACE_BETWEEN_CARDS * cardsOnEachSide) + 25; // Find starting point
    }

    for (var i = 0; i < this.cards.length; i++) {
      TweenLite.to(this.cards[i], app.animationTime, {x: xValue, ease: app.easing});
      xValue += SPACE_BETWEEN_CARDS;

      if (computer) {
        TweenLite.to(this.cards[i], app.animationTime, {y: 25, ease: app.easing});
      }
      else {
        this.cards[i].hidden = false;
        TweenLite.to(this.cards[i], app.animationTime, {y: 650, ease: app.easing});
      }
    }
  };
}