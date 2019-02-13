var http = require('http');

var server = http.createServer(function(req /*IncomingMessage */, res /* ServerResponse */){
    res.write('<h1>Welcome to Node.js</h1>');
    res.end();
});

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on 8080!');
});

console.log('Server starting....');
