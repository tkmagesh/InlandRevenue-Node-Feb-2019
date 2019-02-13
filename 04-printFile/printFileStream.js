var fs = require('fs');

var stream = fs.createReadStream('./calculator.dat', {encoding : 'utf8'});

//open, data, end, close, error
var readCount = 0;

stream.on('data', function(chunk){
    console.log(chunk);
    ++readCount;
});

stream.on('end', function(){
    console.log('thats all mate!');
    console.log('readCount = ', readCount);
});

stream.on('error', function(err){
    console.log(err);
});