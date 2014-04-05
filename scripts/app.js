/* global Game, states, Player, FastClick, Modernizr */
 
var app = {
  computerGoesFirst: false,
  game: new Game(),
  handsCenteredOn: 0.5,
  cardWidth: 142,
  cardHeight: 199,
  screenWidth: null,
  screenHeight: null,
  stockY: null,
  playerY: null,
  opponentY: null,
  opponentScore: null,
  animationTime: 600,
  stockHintX: null,
  stockHintY: null,
  discardHintX: null,
  discardHintY: null,
  players: [
    new Player(false),
    new Player(true)
  ],
  orientationWarningShowing: false,
  showOrientationWarning: function() {
    document.querySelectorAll('.orientationWarning')[0].style.display = 'block';
    document.querySelectorAll('.orientationWarning')[0].style['z-index'] = '20000';
    app.orientationWarningShowing = true;
  },
  hideOrientationWarning: function() {
    document.querySelectorAll('.orientationWarning')[0].style.display = 'none';
    app.orientationWarningShowing = false;
  },
  updateLayoutVariables: function() {
    app.screenWidth = window.innerWidth;
    app.screenHeight = document.documentElement.clientHeight;

    if (app.screenHeight > app.screenWidth && !app.orientationWarningShowing) {
      app.showOrientationWarning();
    }
    else if (app.orientationWarningShowing) {
      app.hideOrientationWarning();
    }

    // Set PlayerY
    app.playerY = app.screenHeight - app.cardHeight - 35;

    // Set OpponentY
    if (app.screenHeight < 506) {
      app.opponentY = -175;
    }
    else if (app.screenHeight >= 506 && app.screenHeight < 578) {
      app.opponentY = -150;
    }
    else {
      app.opponentY = -100;
    }

    // Opponent Score
    document.querySelectorAll('.computerScore')[0].style.top = (app.opponentY + app.cardHeight + 10) + 'px';
    
    // Set StockY
    if (app.screenHeight < 506) {
      app.stockY = 50;
    }
    else if (app.screenHeight >= 506 && app.screenHeight < 578) {
      app.stockY = 85;
    }
    else if (app.screenHeight >= 578 && app.screenHeight < 625) {
      app.stockY = 135;
    }
    else if (app.screenHeight >= 625 && app.screenHeight < 680) {
      app.stockY = 170;
    }
    else if (app.screenHeight >= 680 && app.screenHeight < 750) {
      app.stockY = 210;
    }
    else {
      app.stockY = 250;
    }

    window.scroll(0, 500);
  },
  removePreload: function() {
    var elements = document.querySelectorAll('.preload');
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('preload');
    }
  },
  init: function() {
    // The preload class will prevent css transitions while the page is being loaded
    // Once the page is loaded we need to remove it to re-enable the transitions
    app.removePreload();

    // When the browser resizes we need to update our layout
    window.addEventListener('resize:end', function() {
      app.updateLayoutVariables();
      app.game.layout();
    }, false);

    document.querySelectorAll('.arrow.stock')[0].addEventListener('click', function() {
      if (app.game.stock.length > 0) {
        app.game.stock[app.game.stock.length - 1].element.click();
      }
    });

    document.querySelectorAll('.arrow.discard')[0].addEventListener('click', function() {
      if (app.game.discards.length > 0) {
        app.game.discards[app.game.discards.length - 1].element.click();
      }
    });

    document.addEventListener('cardClicked', function(e) {
      // Nothing should happend unless it is the players turn
      if (!app.game.computerTurn) {
        // Depending on what we are waiting for, react appropriately
        switch (app.game.state) {
          case states.DRAW:
            app.players[0].draw(e.card);
            break;
          case states.DISCARD:
            app.players[0].discard(e.card);
            app.game.layout();
            break;
        }
      }
    });

    var continueButton = document.querySelectorAll('#continueModal > .button')[0];
    continueButton.addEventListener('click', function() {
      app.hideContinueModal();
      app.game.nextHand();
    });

    // Set up fastclick for mobile devices
    window.addEventListener('load', function() {
      FastClick.attach(document.body);
      document.ontouchmove = function(e){
        e.preventDefault();
      };
    }, false);

    app.updateLayoutVariables();
    app.game.deal();
  },

  updateScoreDOM: function() {
    document.querySelectorAll('.playerScore > .scoreValue')[0].textContent = app.players[0].score;
    document.querySelectorAll('.computerScore > .scoreValue')[0].textContent = app.players[1].score;
  },

  showModal: function(id) {
    var modal = document.querySelectorAll('#' + id)[0];
    modal.style[Modernizr.prefixed('transform')] = 'translateX(-50%) translateZ(2px)';
  },

  hideModal: function(id) {
    var modal = document.querySelectorAll('#' + id)[0];
    modal.style[Modernizr.prefixed('transform')] = 'translateX(-201%) translateZ(2px)';
  },

  showContinueModal: function() {
    document.querySelectorAll('#continueYourScore')[0].textContent = app.players[0].score;
    document.querySelectorAll('#continueOpponentScore')[0].textContent = app.players[1].score;

    this.showModal('continueModal');
  },

  hideContinueModal: function() {
    this.hideModal('continueModal');
  },

  showWinnerModal: function() {
    if (app.players[0].score < app.players[1].score) {
      document.querySelectorAll('#winnerModal .gameResult')[0].textContent = 'You Won!';
    }
    else if (app.players[0].score === app.players[1].score) {
      document.querySelectorAll('#winnerModal .gameResult')[0].textContent = 'It\'s a Tie!';
    }
    else {
      document.querySelectorAll('#winnerModal .gameResult')[0].textContent = 'You Lost!';
    }

    document.querySelectorAll('#winnerYourScore')[0].textContent = app.players[0].score;
    document.querySelectorAll('#winnerOpponentScore')[0].textContent = app.players[1].score;

    this.showModal('winnerModal');
  },

  hideWinnerModal: function() {
    this.hideModal('winnerModal');
  }
};

var readyStateCheckInterval = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(readyStateCheckInterval);
    app.init();
  }
}, 20);