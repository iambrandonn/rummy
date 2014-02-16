module.exports = {
  shuffle: function (toShuffle) {
    // Make a copy of the array that we can pull items from
    var arrayCopy = toShuffle.slice(0);

    // Create the target array
    var newArray = new Array(arrayCopy.length);

    /* This function will attempt to place a value at the given index
       If that index is already taken it will try the next spot,
      wrapping to the beginning of the array if necessary */
    var placeAt = function(index, value) {
      if (newArray[index] === undefined) {
        newArray[index] = value;
      }
      else {
        if (index + 1 === newArray.length) {
          placeAt(0, value);
        }
        else {
          placeAt(index + 1, value);
        }
      }
    };

    // Pull a random element from the array and insert it into 
    // a random place in the new array
    for (var i = 0; i < newArray.length; i++) {
      // Choose a random element to work with
      var index = Math.floor((Math.random() * arrayCopy.length));
      placeAt(Math.floor(Math.random() * arrayCopy.length), arrayCopy[index]);

      // Remove that element from the old array
      arrayCopy.splice(index, 1);
    }

    return newArray;
  }
};

