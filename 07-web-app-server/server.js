var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

var staticResExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
    var resourceExtn = path.extname(resourceName);
    return staticResExtns.indexOf(resourceExtn) >= 0;
}

var server = http.createServer(function(req /*IncomingMessage */, res /* ServerResponse */){
    
    
    var urlObj = url.parse(req.url),
        resourceName = urlObj.pathname === '/' ? '/index.html' : urlObj.pathname;
    
    console.log(req.method + '\t' + urlObj.pathname);

    if (isStatic(resourceName)){
        var  resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        var stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
        stream.on('error', function(err){
            console.log(err);
            res.statusCode = 500;
            res.end();
        })
    } else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
        var queryData = querystring.parse(urlObj.query);
        var op = queryData.op,
            x = parseInt(queryData.x),
            y = parseInt(queryData.y),
            result = calculator[op](x,y);

        res.write(result.toString());
        res.end();
    } else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
        var rawData = '';
        req.on('data', function(chunk){
            rawData += chunk;
        });
        req.on('end', function(){
            var bodyData = querystring.parse(rawData);
            var op = bodyData.op,
                x = parseInt(bodyData.x),
                y = parseInt(bodyData.y),
                result = calculator[op](x,y);

            res.write(result.toString());
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on 8080!');
});

console.log('Server starting....');
