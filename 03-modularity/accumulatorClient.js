var acc = require('./accumulator');

acc.add(100);
acc.subtract(50);
acc.multiply(10);
acc.divide(2);

console.log(acc.getResult()); // ==> 250

