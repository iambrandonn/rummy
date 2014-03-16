/* global Modernizr, console */
/* exported Card */

function Card(newSuit, newValue) {
  this.rank = newValue;
  this.suit = newSuit;
  this.element = document.createElement('div');
  this.element.card = this;
  this.element.classList.add('card');
  this.element.classList.add('hidden');
  this.element.classList.add('_' + this.rank);
  this.element.classList.add(this.suit);

  this.element.addEventListener('click', function() {
    var cardClickedEvent = document.createEvent('UIEvents');
    cardClickedEvent.initEvent('cardClicked', true, true);
    cardClickedEvent.card = this.card;
    document.dispatchEvent(cardClickedEvent);
  });

  this.findNumericRank = function() {
    switch (this.rank) {
      case 'A':
        return 1;
      case 'J':
        return 11;
      case 'Q':
        return 12;
      case 'K':
        return 13;
      default:
        return parseInt(this.rank);
    }
  };

  this.updateLayout = function(x, y, rotation, scale) {
    var transformDefinition = 'translateX(' + (x) + 'px) translateY(' + y + 'px)';
    if (rotation !== undefined) {
      transformDefinition += ' rotateZ(' + rotation + 'deg)';
    }
    if (scale !== undefined) {
      transformDefinition += ' scale(' + scale + ')';
    }
    this.element.style[Modernizr.prefixed('transform')] = transformDefinition;
  };

  this.setZ = function(z) {
    this.element.style[Modernizr.prefixed('zIndex')] = z;
  };

  this.show = function() {
    this.element.classList.remove('hidden');
  };

  this.hide = function() {
    this.element.classList.add('hidden');
  };

  this.log = function() {
    console.log(this.rank + '\t' + this.suit);
  };

  this.setPlayerHand = function() {
    this.element.classList.add('playerHand');
    this.element.classList.remove('computerHand');
  };

  this.setComputerHand = function() {
    this.element.classList.add('computerHand');
    this.element.classList.remove('playerHand');
  };

  this.numericRank = this.findNumericRank();
}