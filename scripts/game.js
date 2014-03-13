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
    if (this.melds.length > 0) {
      this.centerHandsOn(0.65);
    }
    else {
      this.centerHandsOn(0.5);
    }
    this.layoutMelds();

    this.layoutStock();
    this.layoutDiscards();

    this.players[0].hand.layout();
    this.players[1].hand.layout();
  };

  this.centerHandsOn = function(percent) {
    app.handsCenteredOn = percent;
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
        if (app.computerTurn) {
          console.err('finish this');
          app.game.players[1].hand.layDownMelds();
        }
        else {
          app.game.draw(function() {
            app.game.players[0].hand.layDownMelds();
            app.game.players[0].hand.discard(function() {
              alert('turn done!');
            });
          });
        }
      }, 750);
    }, 750);
  };

  this.draw = function(callback) {
    var handleClick = function(e) {
      var playerIndex;
      if (app.computerTurn) {
        playerIndex = 1;
      }
      else {
        playerIndex = 0;
      }

      if (e.card === app.game.discards[app.game.discards.length - 1]) {
        app.game.drawFromDiscards(app.game.players[playerIndex]);
        document.removeEventListener('cardClicked', handleClick);
        callback();
      }
      else if (e.card === app.game.stock[app.game.stock.length - 1]) {
        app.game.drawFromStock(app.game.players[playerIndex]);
        document.removeEventListener('cardClicked', handleClick);
        callback();
      }
    };
    document.addEventListener('cardClicked', handleClick);
  };

  this.drawFromStock = function(player) {
    if (this.stock.length > 0) {
      var card = this.stock.pop();
      player.hand.addCard(card);
    }
  };

  this.drawFromDiscards = function(player) {
    if (this.discards.length > 0) {
      var card = this.discards.pop();
      player.hand.addCard(card);
    }
  };

  this.layoutStock = function() {
    for (var stockIndex = 0; stockIndex < this.stock.length; stockIndex++) {
      this.stock[stockIndex].updateLayout(
        (app.screenWidth * app.handsCenteredOn) - 100 + (Math.random() * 4) - 2 - (app.cardWidth / 2),
        app.stockY,
        Math.random() * 2 - 1
      );
    }
  };

  this.layoutDiscards = function() {
    for (var i = 0; i < app.game.discards.length; i++) {
      app.game.discards[i].updateLayout(
        (app.screenWidth * app.handsCenteredOn) + 100 + (Math.random() * 4) - 2 - (app.cardWidth / 2),
        app.stockY,
        0
      );
    }
  };

  this.layoutMelds = function() {
    var yDistance = (app.screenHeight - 80) / this.melds.length;
    var currentMeldY = 40;
    var zIndex = 10;

    for (var meldIndex in this.melds) {
      var currentCardX = 40;
      for(var cardIndex in this.melds[meldIndex]) {
        this.melds[meldIndex][cardIndex].updateLayout(currentCardX, currentMeldY, 0);
        this.melds[meldIndex][cardIndex].setZ(zIndex);
        this.melds[meldIndex][cardIndex].show();
        currentCardX += 23;
        zIndex++;
      }

      if (yDistance > app.cardHeight + 20) {
        currentMeldY += app.cardHeight + 20;
      }
      else {
        currentMeldY += yDistance;
      }
    }
  };
}