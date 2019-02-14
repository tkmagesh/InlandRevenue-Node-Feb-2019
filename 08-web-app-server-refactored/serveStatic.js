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
    }
}