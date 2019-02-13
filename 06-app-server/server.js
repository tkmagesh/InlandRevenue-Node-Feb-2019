var http = require('http'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

var server = http.createServer(function(req, res,){
    var urlObj = url.parse(req.url),
        resourceName = urlObj.pathname,
        queryData = querystring.parse(urlObj.query);

    if (resourceName !== '/calculator'){
        res.statusCode = 404;
        res.end();
        return;
    }

    var op = queryData.op,
        x = parseInt(queryData.x),
        y = parseInt(queryData.y),
        result = calculator[op](x,y);

    res.write(result.toString());
    res.end();
});

server.listen(8085);
server.on('listening', function(){
    console.log('app server listening on port 8085');
});

console.log('app server started..');