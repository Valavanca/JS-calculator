function BaseCalculator() {
    this.result;
    this.level; // means of counting procedure. false - [+,-], true - [*,/]
    this.lastElement;
    this.rollback;
    this.operator; 
    return (init)=>{
        this.result = init;
        this.level = true;
        return this;
    };
};
BaseCalculator.prototype = { // basic operations
    add: function (x) {
        this.level = false;
        this.result +=x;
        this.rollback = -x; // ' - ' because we'll add this value
        this.lastElement = x;
        this.operator = this.add;   
        return this;
    },
    sub: function (x) {
        this.level = false;
        this.result -=x;
        this.rollback = x;
        this.lastElement = x;
        this.operator = this.sub;
        return this;
    },
    div: function (x) {
        if(this.level===false) {
            this.result += this.rollback;
            this.level = false;
            return this.operator(this.lastElement / x);
        } else {
            this.lastElement = x;
            this.result /=x;
            return this;
        }
    },
    mul: function (x) {
        if(this.level===false) {
            this.result += this.rollback;
            this.level = false;
            return this.operator(x * this.lastElement);
        } else {
            this.lastElement = x;
            this.result *=x;
            return this;
        }
    },
    result: function () {
        return this.result;
    }
}


function WebInterface() {
    this.cl = new BaseCalculator;
    this.tempCl = this.cl;
    this.tempFunction;
    this.display = {
        input: '',
        output: ''
    };

    var that = this;
    var topLine = document.getElementById("input");
    var botLine = document.getElementById("output");

    //                                                                                                                                                                                      ***********
    //                                                                                                                                                                                                  Methods
    //                                                                                                                                                                                      ***********
    function inputNumbers (el) {   // input number by clicking
        el.addEventListener("click", function(e) {
            that.display.input += this.innerText;
            topLine.innerText = that.display.input; 
        })
    }

    function useTempFunction(context) {
         if(!context.tempFunction) {
            context.tempCl =  context.cl(parseFloat(context.display.input));
            console.log("Init with ", parseFloat(context.display.input));
        } else {
            context.tempCl = context.tempFunction.call(context.tempCl, parseFloat(context.display.input));
            console.log("call - that.temp ::", context.tempCl);
        }
    }

    [].forEach.call(document.getElementsByClassName("number"), (e) => {
        inputNumbers(e);
    });
    function plus () {             
        topLine.innerText = '+';                                                             // Plus
        botLine.innerText += parseFloat(that.display.input) + '+';
        
        useTempFunction(that);
        that.tempFunction = that.tempCl.add;
        that.display.input = '';
    }
    function minus () {
        topLine.innerText = '-';                                                                             // Minus
        botLine.innerText += parseFloat(that.display.input) + '-';

        useTempFunction(that);
        that.tempFunction = that.tempCl.sub;
        that.display.input = '';
    }
    function mul () {
        topLine.innerText = '\u00B7';                                                                    // Multiplication
        botLine.innerText += parseFloat(that.display.input) + '\u00B7';

        useTempFunction(that);
        that.tempFunction = that.tempCl.mul;
        that.display.input = '';
    }
    function div () {
        topLine.innerText = '/';                                                                                   // Division
        botLine.innerText += parseFloat(that.display.input) + '/';

        useTempFunction(that);
        that.tempFunction = that.tempCl.div;
        that.display.input = '';
    }
    function equal () { 
        useTempFunction(that);
        topLine.innerText = '';
        botLine.innerText += (parseFloat(that.display.input)||'') + '=' + that.tempCl.result;

        that.tempCl = that.cl;
        that.tempFunction = null;
        that.display.input = '';
    }
    function clear (e) { // clear input number
        that.display.input = '';
        topLine.innerText = 0;
        botLine.innerText  = '';
        that.cl.result = undefined;
    }



    //                                                                                                                                                                                      ***********
    //                                                                                                                                                                                       Get HTML buttons
    //                                                                                                                                                                                      ***********
    document.getElementById("plus").addEventListener("click",  function (){  
        plus();
    });

    document.getElementById("minus").addEventListener("click", function() {
        minus();
    });

    document.getElementById("multiplic").addEventListener("click", function() {
        mul();
    });

    document.getElementById("division").addEventListener("click", function() {
        div();
    });

    document.getElementById("equal").addEventListener("click", function() {
        equal();
    });
    document.getElementById("clear").addEventListener("click", (e) => {
        clear(e);
    });
    
    
};


var interface = new WebInterface();
