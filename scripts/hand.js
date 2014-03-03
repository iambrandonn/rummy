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
    var ANGLE_BETWEEN_CARDS = 0.05;
    var HEIGHT_OFFSET = -3;
    var cardsOnEachSide;
    var xValue;
    var angle;
    var curveYdiff;

    if (isOdd) {
      cardsOnEachSide = (this.cards.length - 1) / 2;
      xValue = (app.canvasWidth / 2) - (SPACE_BETWEEN_CARDS * cardsOnEachSide) + app.leftShift; // Find starting point

      if (computer) {
        angle = ANGLE_BETWEEN_CARDS * cardsOnEachSide;
      }
      else {
        angle = -ANGLE_BETWEEN_CARDS * cardsOnEachSide;
      }
    }
    else {
      cardsOnEachSide = (this.cards.length) / 2;
      xValue = (app.canvasWidth / 2) - (SPACE_BETWEEN_CARDS * cardsOnEachSide) + 25 + app.leftShift; // Find starting point

      if (computer) {
        angle = ANGLE_BETWEEN_CARDS * cardsOnEachSide - (ANGLE_BETWEEN_CARDS / 2);
      }
      else {
        angle = -ANGLE_BETWEEN_CARDS * cardsOnEachSide + (ANGLE_BETWEEN_CARDS / 2);
      }
    }

    curveYdiff = HEIGHT_OFFSET * cardsOnEachSide;

    for (var i = 0; i < this.cards.length; i++) {
      TweenLite.to(this.cards[i], app.animationTime, {x: xValue, ease: app.easing});
      TweenLite.to(this.cards[i], app.animationTime, {rotation: angle, ease: app.easing});
      xValue += SPACE_BETWEEN_CARDS;

      if (computer) {
        angle -= ANGLE_BETWEEN_CARDS;
        TweenLite.to(this.cards[i], app.animationTime, {y: -25, ease: app.easing});
      }
      else {
        angle += ANGLE_BETWEEN_CARDS;
        this.cards[i].hidden = false;
        TweenLite.to(this.cards[i], app.animationTime, {y: 625 - curveYdiff, ease: app.easing});
      }

      curveYdiff -= HEIGHT_OFFSET;
      if (curveYdiff >= 0) {
        HEIGHT_OFFSET = -HEIGHT_OFFSET;
        curveYdiff -= HEIGHT_OFFSET;
      }

    }
  };
}