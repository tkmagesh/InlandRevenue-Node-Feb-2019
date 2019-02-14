var  fs = require('fs'),
    path = require('path');

var staticResExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
    var resourceExtn = path.extname(resourceName);
    return staticResExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function serveStatic(req, res){
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)){
        var  resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            console.log('[@serveStatic] - serving 404');
            res.statusCode = 404;
            res.end();
            return;
        }
        /*
        var stream = fs.createReadStream(resourceFullName);
        //stream.pipe(res);
        stream.on('data', function(chunk){
            console.log('[@serveStatic] - serving chunk');
            res.write(chunk);
        });
        stream.on('end', function(){
            console.log('[@serveStatic] - ending response');
            res.end();
        });

        stream.on('error', function(err){
            console.log(err);
            res.statusCode = 500;
            res.end();
        })*/
        console.log('[@serveStatic] - serving fileContents');
        var fileContents = fs.readFileSync(resourceFullName);
        res.write(fileContents);
    }
}