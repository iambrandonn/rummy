/* global Modernizr */
/* exported Card */

function Card(newSuit, newValue) {
  this.rank = newValue;
  this.suit = newSuit;
  this.element = document.createElement('div');
  this.element.classList.add('card');
  this.element.classList.add('hidden');

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

  this.updateLayout = function(x, y, rotation) {
    this.element.style[Modernizr.prefixed('transform')] = 'translateX(' + (x) + 'px) translateY(' + y + 'px) rotateZ(' + rotation + 'deg)';
  };

  this.setZ = function(z) {
    this.element.style[Modernizr.prefixed('zIndex')] = z;
  };

  this.show = function() {
    this.element.classList.remove('hidden');
    this.element.classList.add('_' + this.rank);
    this.element.classList.add(this.suit);
  };

  this.hide = function() {
    this.element.classList.remove('_' + this.rank);
    this.element.classList.remove(this.suit);
    this.element.classList.add('hidden');
  };

  this.numericRank = this.findNumericRank();
}