/* global app, states */
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
        this.cards[i].hide();
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
    var setLayedDown = this.layDownSets();
    var runLayedDown = this.layDownRuns();
    var additions = this.layDownAdditions();

    return setLayedDown || runLayedDown || additions;
  };

  this.layDownAdditions = function() {
    var isSetMeld = function(meld) {
      return meld[0].numericRank === meld[1].numericRank;
    };

    for (var cardIndex in this.cards) {
      for (var meldIndex in app.game.melds) {
        var card = this.cards[cardIndex];
        var meld = app.game.melds[meldIndex];
        var removed = false;

        if (isSetMeld(meld)) {
          if (card.numericRank === meld[0].numericRank) {
            removed = true;
            meld.push(card);
          }
        }
        else {
          if (meld[0].suit === card.suit) {
            if (meld[0].numericRank - 1 === card.numericRank) {
              removed = true;
              meld.unshift(card);
            }
            else if (meld[meld.length - 1] + 1 === card.numericRank) {
              removed = true;
              meld.push(card);
            }
          }
        }

        if (removed) {
          this.cards.splice(cardIndex, 1);
          continue;
        }
      }
    }
  };

  this.getSetLength = function(startIndex) {
    var length = 1;
    var currentIndex = startIndex + 1;
    while (currentIndex < this.cards.length && this.cards[currentIndex].rank === this.cards[startIndex].rank) {
      length++;
      currentIndex++;
    }

    return length;
  };

  this.indexOf = function(suit, numericRank) {
    for (var i = 0; i < this.cards.length; i++) {
      if (this.cards[i].suit === suit && this.cards[i].numericRank === numericRank) {
        return i;
      }
    }

    return -1;
  };

  this.cardIsPartOfRun = function(index) {
    var result = [];

    var offset = 1;
    var theCard = this.cards[index];

    var place = index;

    do {
      result.push(place);
      place = this.indexOf(theCard.suit, theCard.numericRank + offset);
      offset++;
    } while (place >= 0);

    return result;
  };

  this.layDownSets = function() {
    var result = false;

    // look at each card
    for (var i = 0; i < this.cards.length; i++) {
      var length = this.getSetLength(i);
      if (length > 2) {
        var removed = this.cards.splice(i, length);
        this.layDownMeld(removed);
        result = true;
      }
    }

    return result;
  };

  this.layDownRuns = function() {
    var result = false;

    // look at each card
    for (var i = 0; i < this.cards.length; i++) {
      var run = this.cardIsPartOfRun(i);

      if (run.length > 2) {
        var removed = [];
        for (var runCardIndex = run.length - 1; runCardIndex >= 0; runCardIndex--) {
          var card = this.cards.splice(run[runCardIndex], 1)[0];
          removed.unshift(card);
        }
        this.layDownMeld(removed);
        result = true;
      }
    }

    return result;
  };

  this.layDownMeld = function(cardsToLayDown) {
    app.game.melds.push(cardsToLayDown);
  };

  this.addCard = function(card) {
    this.cards.push(card);
    this.order();
  };

  this.playerDiscard = function(card) {
    app.state = null;
    var playerIndex;
    if (app.computerTurn) {
      playerIndex = 1;
    }
    else {
      playerIndex = 0;
    }

    var placeInHand = this.indexOf(card.suit, card.numericRank);

    if (placeInHand >= 0) {
      this.cards.splice(placeInHand, 1);
      app.game.discards.push(card);
      card.show();
      app.state = states.DRAW;
      app.toggleTurn();
    }
    else {
      app.state = states.DISCARD;
    }
  };
}