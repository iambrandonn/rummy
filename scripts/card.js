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
        xOffset = 1 + 10 * 143;
        break;
      case 'Q':
        xOffset = 1 + 11 * 143;
        break;
      case 'K':
        xOffset = 2 + 12 * 143;
        break;
      default:
        xOffset = 1 + (parseInt(this.rank) - 1) * 143;
    }

    switch (this.suit) {
      case 'C':
        yOffset = 0;
        break;
      case 'H':
        yOffset = 200;
        break;
      case 'S':
        yOffset = 401;
        break;
      case 'D':
        yOffset = 601;
        break;
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.rotation !== 0) {
      ctx.rotate(this.rotation);
    }

    if (this.hidden) {
      ctx.drawImage(window.app.CARDSIMAGE, 1869, 3, 131, 192, -71, -100, 142, 199);
    }
    else {
      ctx.strokeRect(-72, -100, 143, 200);
      ctx.drawImage(window.app.CARDSIMAGE, xOffset, yOffset, 142, 199, -71, -100, 142, 199);
    }
    ctx.restore();
  };

  this.numericRank = this.findNumericRank();
}