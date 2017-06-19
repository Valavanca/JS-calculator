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
    this.display = {
        input: '',
        output: ''
    };
    var that = this;
    var print = document.getElementById("input");

    [].forEach.call(document.getElementsByClassName("number"), function(el) {    
        el.addEventListener("click", function(e) {
            that.display.input += this.innerText;
            print.innerText = that.display.input; 
        })
    });
    document.getElementById("clear").addEventListener("click", function(e){
        that.display.input = '';
        print.innerText = 0;
        cl.result = undefined;
    });
    // Methods
    function getFloatFromInput() {
        if(cl.result===undefined) {
            return cl(parseFloat(that.display.input));
        } else {
            return parseFloat(that.display.input)
        }
    }
};

WebInterface.prototype = {
    upd: ()=>{

    }
};

var interface = new WebInterface();
