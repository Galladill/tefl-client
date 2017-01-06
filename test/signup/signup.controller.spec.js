var chai = require('chai');
var should = chai.should();

describe("A suite is just a function", function () {
    var a;

    it("and so is a spec", function () {
        a = true;

        a.should.equal(true);
    });
});