var http = require('http'),

    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    notFoundHandler = require('./notFoundHandler'),
    app = require('./app');
/*
app.use(function(req, res, next){
    console.log('before dataparser');
    console.log('querydata => ', req.queryData);
    console.log('bodydata => ', req.bodyData);
    next();
})
*/
app.use(dataParser);
/*
app.use(function(req, res, next){
    console.log('after dataparser');
    console.log('querydata => ', req.queryData);
    console.log('bodydata => ', req.bodyData);
    next();
})
*/
app.use(serveStatic);
app.use(serveCalculator);
app.use(notFoundHandler);

var server = http.createServer(app);

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on 8080!');
});

console.log('Server starting..s..');
