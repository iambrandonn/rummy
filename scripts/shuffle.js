module.exports = {
  shuffle: function (toShuffle) {
    var newArray = new Array(toShuffle.length);
    var placeAt = function(index, value) {
      if (newArray[index] === undefined) {
        newArray[index] = value;
      }
      else {
        if (index + 1 === toShuffle.length) {
          placeAt(0, value);
        }
        else {
          placeAt(index + 1, value);
        }
      }
    };

    for (var i = 0; i < toShuffle.length; i++) {
      placeAt(Math.floor(Math.random() * toShuffle.length), toShuffle[i]);
    }

    return newArray;
  }
};

