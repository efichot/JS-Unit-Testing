var checkForShip = require('./ship_methods.js').checkForShip;
const fireUp = require('./ship_methods.js').fireUp;

function validateLocation (player, coordinates) {
  var x = coordinates[0];
  var y = coordinates[1];

  var spaceAvailable = !checkForShip(player, coordinates);

  if ((x <= 9 && x >= 0) && (y <= 9 && y >= 0)) {
    return spaceAvailable; // decides whether this valid space is occupied
  } else {
    return false;
  }
}

function validateLocations (player, locations) {
  var validated = locations.map(function (location) {
    return validateLocation(player, location);
  });
  return validated.indexOf(false) === -1;
}

function placeShip (player, ship, startingCoordinates, direction) {
  if (!direction) throw Error('You left out the direction! I need that for math!');
  var proposedLocations = [];
  var previousLocation,
    rowNumber,
    columnNumber;

  for (var i = 0; i < ship.size; i++) {
    previousLocation = proposedLocations[i - 1] || [];
    rowNumber = previousLocation[0];
    columnNumber = previousLocation[1];
    
    proposedLocations[i] = (i === 0)
      ? startingCoordinates
      : (direction === 'horizontal')
        ? [rowNumber, ++columnNumber]
        : [++rowNumber, columnNumber];
  }
  
  if (validateLocations(player, proposedLocations)) {
    ship.locations = proposedLocations;
  } else {
    return false;
  }
}

function computerFire (player) {
  var x = Math.floor(Math.random() * 9);
  var y = Math.floor(Math.random() * 9);
  var coordinates = [x, y];

  const arr = coordinates.filter(function(n) {
    if (/^[0-9]$/.test(n.toString())) {
        return (n === 0) ? true : n;
    }
  });
  console.log(x);
  console.log(y);
  console.log(arr);
  if (arr.length === 2) return fireUp(player, coordinates);
  return false;
  
}

function computerPlaceShip (player, ship) {
  var direction = Math.random() > 0.5
    ? 'horizontal'
    : 'vertical';
  var x = Math.floor(Math.random() * 9);
  var y = Math.floor(Math.random() * 9);
  var coordinates = [x, y];
  placeShip(player, ship, coordinates, direction);
}

module.exports = {
  placeShip: placeShip,
  validateLocations: validateLocations,
  validateLocation: validateLocation,
  computerPlaceShip: computerPlaceShip,
  computerFire: computerFire
};