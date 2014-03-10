/* global app */
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
    var ANGLE_BETWEEN_CARDS = 3;
    var cardsOnEachSide;
    var xValue;
    var yValue;
    var angle;
    var curZindex = 10;

    if (isOdd) {
      cardsOnEachSide = (this.cards.length - 1) / 2;

      if (this.isComputer) {
        angle = ANGLE_BETWEEN_CARDS * cardsOnEachSide;
      }
      else {
        angle = -ANGLE_BETWEEN_CARDS * cardsOnEachSide;
      }
    }
    else {
      cardsOnEachSide = (this.cards.length) / 2;

      if (this.isComputer) {
        angle = ANGLE_BETWEEN_CARDS * cardsOnEachSide - (ANGLE_BETWEEN_CARDS / 2);
      }
      else {
        angle = -ANGLE_BETWEEN_CARDS * cardsOnEachSide + (ANGLE_BETWEEN_CARDS / 2);
      }
    }

    xValue = (app.screenWidth * app.handsCenteredOn)  - (app.cardWidth / 2); // Find starting point

    if (this.isComputer) {
      yValue = app.opponentY;
    }
    else {
      yValue = app.playerY;
    }

    for (var i = 0; i < this.cards.length; i++) {
      this.cards[i].updateLayout(xValue, yValue, angle);

      if (this.isComputer) {
        angle -= ANGLE_BETWEEN_CARDS;
        this.cards[i].setComputerHand(true);
      }
      else {
        angle += ANGLE_BETWEEN_CARDS;
        this.cards[i].show();
        this.cards[i].setPlayerHand(true);
      }

      this.cards[i].setZ(curZindex++);
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
          var removed = this.cards.splice(i - setCount, setCount);
          this.layDownMeld(removed);
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
          var removed = this.cards.splice(i - runCount, runCount);
          this.layDownMeld(removed);
        }
        runCount = 1;
      }
    }
  };

  this.layDownMeld= function(cardsToLayDown) {
    app.game.melds.push(cardsToLayDown);
    for(var cardIndex in cardsToLayDown) {
      cardsToLayDown[cardIndex].updateLayout(0, 0, 0);
      cardsToLayDown[cardIndex].show();
    }
  };
}