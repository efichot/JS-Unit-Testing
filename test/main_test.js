const expect = require('chai').expect;

describe('checkForChip', function() {
    const checkForShip = require('../game_logic/ship_methods').checkForShip;
    let player;

    before(function() {
        player = {
            ships: [
                {
                    locations: [[9, 9], [9, 8], [9, 7]]
                },
                {
                    locations: [[3, 3], [3, 4], [3, 5]]                    
                }
            ]
        }
    })
    it('should correctly report no ship at a given players coordinate', function() {
        expect(checkForShip(player, [0,0])).to.be.false;
    });

    it('should correctly report a ship at a given players coordinate', function() {
        expect(checkForShip(player, [9, 9])).to.be.true;
    });

    it('should handle ships located are more than one coordiante', function() {
        expect(checkForShip(player, [9, 9])).to.be.true;
        expect(checkForShip(player, [0, 0])).to.be.false;
        expect(checkForShip(player, [9, 7])).to.be.true;
    });

    it('should handle checking multiple ships', function() {
        expect(checkForShip(player, [9, 9])).to.be.true;
        expect(checkForShip(player, [0, 0])).to.be.false;
        expect(checkForShip(player, [3, 3])).to.be.true;
        expect(checkForShip(player, [3, 5])).to.be.true;
        expect(checkForShip(player, [3, 7])).to.be.false;
    });
});

describe('damageShip', function() {
    const damageShip = require('../game_logic/ship_methods').damageShip;
    let player;

    beforeEach(function() {
    player = {
            ships: [
                {
                    locations: [[9, 9], [9, 8], [9, 7]],
                    damage: []
                },
                {
                    locations: [[3, 3], [3, 4], [3, 5]],
                    damage: []
                }
            ]
        }

    })

    it('should register damage at a given ship at a given location', function() {
        damageShip(player.ships[0], [9, 9]);

        expect(player.ships[0].damage[0]).to.deep.equal([9, 9]);

    });
});

describe('fireUp', function() {
    const fireUp = require('../game_logic/ship_methods').fireUp;
    let player;

    beforeEach(function() {
    player = {
            ships: [
                {
                    locations: [[9, 9], [9, 8], [9, 7]],
                    damage: []
                },
                {
                    locations: [[3, 3], [3, 4], [3, 5]],
                    damage: []
                }
            ]
        }

    });

    after(function() {
        console.log('running after entire test suite!');
    })

    afterEach(function() {
        console.log('running after each individual unit test!');
    })

    it('should record damage on a ship to a given location', function() {
        fireUp(player, [9,9]);

        expect(player.ships[0].damage[0]).to.deep.equal([9, 9]);

        fireUp(player, [3,5]);
        
        expect(player.ships[1].damage[0]).to.deep.equal([3, 5]);

    })

    it('should not record damage on a ship to a given location', function() {
        fireUp(player, [0,0]);
        
        expect(player.ships[0].damage).to.be.empty;
    })

    it('it should throw an error if coordinates are non valid!', function() {
        let handler = function() { fireUp(player, [0,0,0]) };

        expect(handler).to.throw(Error);

        handler = function() { fireUp(player, []) };

        expect(handler).to.throw('Invalid coordinates param!');
    })
})