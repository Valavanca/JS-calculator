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
var calc = new BaseCalculator(); // ------------------- instance

function WebInterface(){
    this.cl = new BaseCalculator;
    this.tempCl = this.cl;
    this.tempFunction;
    this.display = {
        input: '',
        output: ''
    };

    var that = this;
    var print = document.getElementById("input");
    var output = document.getElementById("output");

    var equal = document.getElementById("equal");

    [].forEach.call(document.getElementsByClassName("number"), function(el) {   // input number
        el.addEventListener("click", function(e) {
            that.display.input += this.innerText;
            print.innerText = that.display.input; 
        })
    });
    document.getElementById("clear").addEventListener("click", function(e){ // clear input number
        that.display.input = '';
        print.innerText = 0;
        cl.result = undefined;
    });
    // Methods
    function useTempFunction(context) {
         if(!context.tempFunction) {
            context.tempCl =  context.cl(parseFloat(that.display.input));
            console.log("init parse", parseFloat(context.display.input));
        } else {
            context.tempCl = context.tempFunction.call(context.tempCl, parseFloat(context.display.input));
            console.log("call - that.temp ::", context.tempCl);
        }
    }

    document.getElementById("plus").addEventListener("click", function(e){                             // +
        output.innerText += parseFloat(that.display.input) + '+';
        useTempFunction(that);

        that.tempFunction = that.tempCl.add;
        /*console.log("that.tempFunction", that.tempFunction);
        console.log("that.temp", that.tempCl);
        console.log("result", that.tempCl.result);*/

        that.display.input = '';
        print.innerText = '+';
    });

    document.getElementById("minus").addEventListener("click", function(e){                             // -
        output.innerText += parseFloat(that.display.input) + '-';
        useTempFunction(that);

        that.tempFunction = that.tempCl.sub;

        that.display.input = '';
        print.innerText = '-';
    });

    document.getElementById("equal").addEventListener("click", function(e){ // =
        useTempFunction(that);
        output.innerText += (parseFloat(that.display.input)||'') + '=' + that.tempCl.result;
        print.innerText = '';

        that.tempCl = that.cl;
        that.tempFunction = null;
        that.display.input = '';
    });
    
    
};

WebInterface.prototype = {
    upd: ()=>{

    }
};

var interface = new WebInterface();
