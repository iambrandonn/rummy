/*global CARDSIMAGE */

module.exports = function(newSuit, newValue) {
  this.value = newValue;
  this.suit = newSuit;
  this.rotation = 0;
  this.x = 0;
  this.y = 0;
  this.hidden = true;
  this.draw = function(ctx) {
    var xOffset, yOffset;
    switch (this.value) {
      case 'A':
        xOffset = 1;
        break;
      case 'J':
        xOffset = 1 + 10 * 73;
        break;
      case 'Q':
        xOffset = 1 + 11 * 73;
        break;
      case 'K':
        xOffset = 1 + 12 * 73;
        break;
      default:
        xOffset = 1 + (parseInt(this.value) - 1) * 73;
    }

    switch (this.suit) {
      case 'C':
        yOffset = 1;
        break;
      case 'S':
        yOffset = 99;
        break;
      case 'H':
        yOffset = 197;
        break;
      case 'D':
        yOffset = 295;
        break;
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.rotation !== 0) {
      ctx.rotate(this.rotation);
    }
    ctx.drawImage(window.CARDSIMAGE, xOffset, yOffset, 71, 96, -(71 / 2), -(96 / 2), 71, 96);
    ctx.restore();
  };
};