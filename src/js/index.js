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

function WorkFlow(context) {
    var isOperator = false;
    this.isDoubleOperator = function () {
        if(isOperator) {
            return true;
        } else {
            isOperator = true;
            return false;
        }
    },
    this.allowOperator = function() {
        if(isOperator==true)
            isOperator = false;
    }
}



function WebInterface() {
    this.cl = new BaseCalculator;
    this.workFlow = new WorkFlow();
    this.tempCl = this.cl(0);
    this.tempFunction;
    this.display = {
        input: '',
        output: ''
    };
 
    const MAX = 8;
    
    var that = this;
    var topLine = document.getElementById("input");
    var botLine = document.getElementById("output");

    //                                                                                                                                                                                      ***********
    //                                                                                                                                                                                                  Methods
    //                                                                                                                                                                                      ***********
    
    [].forEach.call(document.getElementsByClassName("number"), (e) => {
        inputNumbers(e);
    });
    function inputNumbers (el) {   // input number by clicking
        el.addEventListener("click", (e)=>{inputNum(e.target)})
    }   
    function inputNum(el) {
        if(that.display.input.length>MAX) {
            return undefined
        }
        that.workFlow.allowOperator();
        that.display.input += el.innerText;
        topLine.innerText = that.display.input; 
    }

                                                                                                                                                                                /******** Operations ************/
    function templateOperator (symbol, fun) {
        if( that.workFlow.isDoubleOperator()) {
            return undefined
        } else {
            topLine.innerText = symbol;
            if(that.tempFunction==null) { // сheck that the answer is already given
                botLine.innerText = parseFloat(that.display.input) + symbol;
            } else {
                botLine.innerText += parseFloat(that.display.input) + symbol;
            }                                                      
                        
            useTempFunction(that);
            that.tempFunction = fun;
            that.display.input = '';
        }         
    }
    let operator =  {
        minus: ()=>{return templateOperator('-', that.tempCl.sub)},
        plus: ()=>{return templateOperator('+', that.tempCl.add)},
        mul: ()=>{return templateOperator('\u00B7', that.tempCl.mul)},
        div: ()=>{return templateOperator('/', that.tempCl.div)},
     }
    function useTempFunction(context) {
         if(!context.tempFunction) {
            context.tempCl =  context.cl(parseFloat(context.display.input));
            console.log("Init with ", parseFloat(context.display.input));
        } else {
            context.tempCl = context.tempFunction.call(context.tempCl, parseFloat(context.display.input)||0);
            console.log("call - that.temp ::", context.tempCl);
        }
    }

    function equal () { 
        that.workFlow.allowOperator();
        useTempFunction(that);
        topLine.innerText = '';
        botLine.innerText = getResult(botLine);

        that.tempCl = that.cl(0);
        that.tempFunction = null;
        that.display.input = '';
    }
    function clear (e) { // clear input number
        that.workFlow.allowOperator();
        that.display.input = '';
        topLine.innerText = 0;
        botLine.innerText  = '';
        that.cl.result = undefined;
    }
    function getResult(histoty) {
        let result = histoty.innerText + (parseFloat(that.display.input)||'') + '=' + parseFloat(that.tempCl.result.toFixed(6));
        return !!(result.toString().length>MAX*3) ? "Exceeded limit!" : result
    }

    //                                                                                                                                                                                      ***********
    //                                                                                                                                                                                       Get HTML buttons
    //                                                                                                                                                                                      ***********
    document.getElementById("plus").addEventListener("click",  function (){
        operator.plus();
    });

    document.getElementById("minus").addEventListener("click", function() {
        operator.minus();
    });

    document.getElementById("multiplic").addEventListener("click", function() {
        operator.mul();
    });

    document.getElementById("division").addEventListener("click", function() {
        operator.div();
    });

    document.getElementById("equal").addEventListener("click", function() {
        equal();
    });
    document.getElementById("clear").addEventListener("click", (e) => {
        clear(e);
    });
    
    
};



var calculator = new WebInterface();
