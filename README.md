## Javascript Unit Testing
Behavior Driven Development (BDD) for writing unit tests with Motcha.js.
With a small battleship game.
- [x] Different Types of testing
- [x] Behavior Driven Developement
- [x] Motcha and Chai
- [x] Writing Testable Code

## --> mocha --reporter markdown

# TOC
   - [checkForChip](#checkforchip)
   - [damageShip](#damageship)
   - [fireUp](#fireup)
   - [PLAYER METHODS](#player-methods)
     - [validateLocation](#player-methods-validatelocation)
     - [validateLocations](#player-methods-validatelocations)
     - [placeShip](#player-methods-placeship)
   - [COMPUTER PLAYER](#computer-player)
     - [computerFire](#computer-player-computerfire)
<a name=""></a>

<a name="checkforchip"></a>
# checkForChip
should correctly report no ship at a given players coordinate.

```js
expect(checkForShip(player, [0,0])).to.be.false;
```

should correctly report a ship at a given players coordinate.

```js
expect(checkForShip(player, [9, 9])).to.be.true;
```

should handle ships located are more than one coordiante.

```js
expect(checkForShip(player, [9, 9])).to.be.true;
expect(checkForShip(player, [0, 0])).to.be.false;
expect(checkForShip(player, [9, 7])).to.be.true;
```

should handle checking multiple ships.

```js
expect(checkForShip(player, [9, 9])).to.be.true;
expect(checkForShip(player, [0, 0])).to.be.false;
expect(checkForShip(player, [3, 3])).to.be.true;
expect(checkForShip(player, [3, 5])).to.be.true;
expect(checkForShip(player, [3, 7])).to.be.false;
```

<a name="damageship"></a>
# damageShip
should register damage at a given ship at a given location.

```js
damageShip(player.ships[0], [9, 9]);
expect(player.ships[0].damage[0]).to.deep.equal([9, 9]);
```

<a name="fireup"></a>
# fireUp
should record damage on a ship to a given location.

```js
fireUp(player, [9,9]);
expect(player.ships[0].damage[0]).to.deep.equal([9, 9]);
fireUp(player, [3,5]);

expect(player.ships[1].damage[0]).to.deep.equal([3, 5]);
```

should not record damage on a ship to a given location.

```js
fireUp(player, [0,0]);

expect(player.ships[0].damage).to.be.empty;
```

it should throw an error if coordinates are non valid!.

```js
let handler = function() { fireUp(player, [0,0,0]) };
expect(handler).to.throw(Error);
handler = function() { fireUp(player, []) };
expect(handler).to.throw('Invalid coordinates param!');
```

<a name="player-methods"></a>
# PLAYER METHODS
<a name="player-methods-validatelocation"></a>
## validateLocation
shoud confirm valid for unoccupied locations in range.

```js
var location = [0, 0];
var actual = validateLocation(player, location);
expect(actual).to.be.ok;
```

shoud confirm INvalid for occupied locations in range.

```js
var location = [9, 9];
var actual = validateLocation(player, location);
expect(actual).to.be.false;
```

shoud confirm INvalid for UNoccupied locations OUT of range.

```js
var locationHigh = [10, 10];
var locationLow = [-1, -1];
expect(validateLocation(player, locationHigh)).to.be.false;
expect(validateLocation(player, locationLow)).to.be.false;
```

<a name="player-methods-validatelocations"></a>
## validateLocations
should correctly report a list of unoccupied locations is valid.

```js
var locations = [[1, 1], [1, 2], [1, 3], [1, 4]];
expect(validateLocations(player, locations)).to.be.ok;
```

should correctly report a a problem if any location in the list is invalid.

```js
var locations = [[1, 1], [1, 2], [1, 3], [10, 10]];
expect(validateLocations(player, locations)).to.be.false;
locations = [[1, 1], [1, 2], [1, 3], [0, 0]];
expect(validateLocations(player, locations)).to.be.false;
```

<a name="player-methods-placeship"></a>
## placeShip
should update a ship with a valid starting location.

```js
var ship = player.ships[0];
var coordinates = [0, 1];
placeShip(player, ship, coordinates, 'horizontal');
var actual = ship.locations;
expect(actual).to.be.ok;
expect(actual).to.have.length(1);
expect(actual[0]).to.deep.equal([0, 1]);
```

should throw an error if no direction is specified.

```js
var ship = player.ships[0];
var coordinates = [0, 1];

			var handler = function () { placeShip(player, ship, coordinates); };
			expect(handler).to.throw(Error);
			expect(handler).to.throw('You left out the direction! I need that for math!');
```

<a name="computer-player"></a>
# COMPUTER PLAYER
<a name="computer-player-computerfire"></a>
## computerFire
should aim at a random location with valid coordinates.

```js
var ship = player.ships[0];

expect(computerFire(player)).to.be.not.false;
```
