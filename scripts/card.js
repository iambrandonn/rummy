/* exported Card */

function Card(newSuit, newValue) {
  this.rank = newValue;
  this.suit = newSuit;
  this.rotation = 0;
  this.x = 0;
  this.y = 0;
  this.hidden = true;

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

  this.paint = function(ctx) {
    var xOffset, yOffset;
    switch (this.rank) {
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
        xOffset = 1 + (parseInt(this.rank) - 1) * 73;
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
    ctx.scale(2, 2);

    if (this.hidden) {
      ctx.drawImage(window.app.CARDBACKIMAGE, 0, 0, 71, 96, -(71 / 2), -(96 / 2), 71, 96);
    }
    else {
      ctx.drawImage(window.app.CARDSIMAGE, xOffset, yOffset, 71, 96, -(71 / 2), -(96 / 2), 71, 96);
    }
    ctx.restore();
  };

  this.numericRank = this.findNumericRank();
}