/* global TweenLite, app */
/* exported Hand */

function Hand(cards, computer) {
  this.cards = cards;
  this.isComputer = computer;

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

  this.layout = function() {
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

      if (this.isComputer) {
        angle = ANGLE_BETWEEN_CARDS * cardsOnEachSide;
      }
      else {
        angle = -ANGLE_BETWEEN_CARDS * cardsOnEachSide;
      }
    }
    else {
      cardsOnEachSide = (this.cards.length) / 2;
      xValue = (app.canvasWidth / 2) - (SPACE_BETWEEN_CARDS * cardsOnEachSide) + 25 + app.leftShift; // Find starting point

      if (this.isComputer) {
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

      if (this.isComputer) {
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

  this.layDownMelds = function() {
    var startCount = this.cards.length;
    this.layDownSets();
    this.layDownRuns();
    if (this.cards.length !== startCount) {
      this.layout();
    }
  };

  this.layDownSets = function() {
    var setCount = 1;
    for (var i = 1; i < this.cards.length; i++) {
      if (this.cards[i].rank === this.cards[i - 1].rank) {
        setCount++;
      }
      else {
        if (setCount > 2) {
          this.layDownMeld(this.cards.splice(i - setCount, setCount));
        }
        setCount = 1;
      }
    }
  };

  this.layDownRuns = function() {
    var runCount = 1;
    for (var i = 1; i < this.cards.length; i++) {
      if (this.cards[i].suit === this.cards[i - 1].suit && this.cards[i].numericRank === this.cards[i - 1].numericRank + 1) {
        runCount++;
      }
      else {
        if (runCount > 2) {
          this.layDownMeld(this.cards.splice(i - runCount, runCount));
        }
        runCount = 1;
      }
    }
  };

  this.layDownMeld= function(cardsToLayDown) {
    app.game.melds.push(cardsToLayDown);
  };
}