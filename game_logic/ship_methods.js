function checkForShip(player, coordinates) {
    let touch = false;
    player.ships.forEach(function(ship) {
        ship.locations.forEach(function(loc) {
            if (JSON.stringify(loc) === JSON.stringify(coordinates)) {
                touch = true;
            }
        });
    });
    return touch;
}

function damageShip(ship, coordinates) {
    ship.damage.push(coordinates);
}

function fireUp(player, coordinates) {
    let touch = false;
    player.ships.forEach(function(ship, i) {
        ship.locations.forEach(function(loc, i2) {
            if (JSON.stringify(loc) === JSON.stringify(coordinates)) {
                damageShip(player.ships[i], coordinates);
            }
        });
    });
}

module.exports.checkForShip = checkForShip;
module.exports.damageShip = damageShip;
module.exports.fireUp = fireUp;