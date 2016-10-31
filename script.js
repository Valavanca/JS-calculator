function calculator(firstNumber){
	this.result = firstNumber;
}

calculator.prototype.sum = function(){
	if(arguments[1]) {
		this.result=arguments[0];
	}
		for(var i = 0; i < arguments.length; i++){
			this.result = this.result+arguments[i]
		}
		return this;
	}

	calculator.prototype.dif = function(){
	this.result = arguments[0];
		for(var i = 0; i < arguments.length; i++){
			this.result = this.result-arguments[i]
		}
		return this;
	}

	calculator.prototype.div = function(){
		this.result = arguments[0];
		for(var i = 0; i < arguments.length; i++){
			if(arguments[i] === 0){
				console.error('На нуль делить нельзя')
				return;
			}
			else{
				this.result = this.result/arguments[i]
			}
		}
		 return this;
	}

	calculator.prototype.mul = function(){
			this.result = arguments[0];
  		for(var i = 0; i < arguments.length; i++){
  			this.result = this.result*arguments[i]
  		}
  		return this;
}
	calculator.prototype.exp = function(){
			if(arguments[1]) {
				this.result=arguments[0];
			}
      if(arguments[1]===0)
        return 1;
			var temp = this.result;

			for(var i = arguments[1]||arguments[0]; i > 1; i--){
				 this.result *=temp;
			}
			return this;

	}




//      let result = calculator.prototype.sum.apply(this, arguments);


let myCalculator = new calculator(100);




console.log(myCalculator.sum(1, 2, 3, myCalculator.dif(10, 20).result)); //вернет 106
console.log(myCalculator.dif(10, 20)); //вернет 70
console.log(myCalculator.div(2, 2)); //вернет 25
console.log(myCalculator.mul(2, 2)); //вернет 400
console.log(myCalculator.exp(3));
console.log(myCalculator.exp(0));

console.log('_______________');

var temp2 = new calculator();
console.log(temp2);
console.log(temp2.exp(7, 2));
console.log(temp2);

console.log('______-');
console.log(temp2.sum(1, temp2.mul(2,2)));
// console.log(temp2);
console.log(temp2.exp(2));
