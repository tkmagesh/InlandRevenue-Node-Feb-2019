function accumulatorFactory(defaultValue = 0){
    var result = defaultValue;

    var accumulator = {
        add : function(x){
            result += x;
        },
        subtract : function(x){
            result -= x;
        },
        multiply : function(x){
            result *= x;
        },
        divide : function(x){
            result /= x;
        },
        getResult : function(){
            return result;
        }
    };

    return accumulator;
}

module.exports = accumulatorFactory;

/*
function calculatorFactory(){

}

module.exports.accumulatorFactory = accumulatorFactory;

module.exports.calculatorFactory = calculatorFactory
*/