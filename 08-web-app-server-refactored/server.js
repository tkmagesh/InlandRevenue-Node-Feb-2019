var http = require('http'),
    path = require('path'),
    dataParser = require('./dataParser'),
    logger = require('./logger'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    serveProducts = require('./serveProducts'),
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
app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveCalculator);
app.use(serveProducts);
app.use(notFoundHandler);

var server = http.createServer(app);

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on 8080!');
});

console.log('Server starting..s..');
