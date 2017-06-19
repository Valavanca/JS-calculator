describe("calculator", function() {
    var calc;

    beforeEach(function() {
        calc = new BaseCalculator;
    });

    describe("2 arguments", function() {
        it("plus 1+1", function() {
            expect(calc(1).add(1).result).toEqual(2);
        });  
        it("minus 5-1", function() {
            expect(calc(5).sub(1).result).toEqual(4);
        });
        it("multiplication -4*3", function() {
            expect(calc(-4).mul(3).result).toEqual(-12);
        });
        it("divison 102/3", function() {
            expect(calc(102).div(3).result).toEqual(34);
        });
    })

    describe("3 arguments, one-by-one", function() {
        it("1+6+9", function() {
            expect(calc(1).add(6).add(9).result).toEqual(16);
        });
        it("5+5-10", function() {
            expect(calc(5).add(5).sub(10).result).toEqual(0);
        });   
        it("8*2/4", function() {
            expect(calc(8).mul(2).div(4).result).toEqual(4);
        });  
        it("6/2*4", function() {
            expect(calc(6).div(2).mul(4).result).toEqual(12);
        });  
    })

    describe("first multiplication", function() {
        it("2+3*2", function() {
            expect(calc(2).add(3).mul(2).result).toEqual(8);
        });
        it("2+3*2*3", function() {
            expect(calc(2).add(3).mul(2).mul(3).result).toEqual(20);
        });
        it("-10+3*5*3-10*2", function() {
            expect(calc(-10).add(3).mul(5).mul(3).sub(10).mul(2).result).toEqual(15);
        });
    })

    describe("first division", function() {
        it("2+4/2", function() {
            expect(calc(2).add(4).div(2).result).toEqual(4);
        });
        it("10/2+9/-3", function() {
            expect(calc(10).div(2).add(9).div(-3).result).toEqual(2);
        });
    })
});

