const expect = require('chai').expect;

expect(true).to.be.true;

function titleCase(title) {
    // return title[0].toUpperCase() + title.substring(1);
    title = title.toLowerCase();
    let ret = '';
    title.split(' ').map(function(word) {
        ret += word[0].toUpperCase() + word.substring(1) + ' ';
    });
    return ret.substring(0, ret.length - 1);
}

// describe create test suite
describe('Motcha', function() {
    // it create unit testing allias test spec
    it('function titleCase', function() {
        expect(titleCase('gladiator is master piece')).to.be.a('string');
        expect(titleCase('a')).to.equal('A');
        expect(titleCase('abe')).to.equal('Abe');
        expect(titleCase('gladiator is master piece')).to.equal('Gladiator Is Master Piece');
        expect(titleCase('gladiator is maSter piece')).to.equal('Gladiator Is Master Piece');
    });
})
