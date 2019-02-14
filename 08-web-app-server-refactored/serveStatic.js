var  fs = require('fs'),
    path = require('path');

var staticResExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resourceName){
    var resourceExtn = path.extname(resourceName);
    return staticResExtns.indexOf(resourceExtn) >= 0;
}

module.exports = function serveStatic(req, res, next){
    var resourceName = req.urlObj.pathname === '/' ? '/index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)){
        var  resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            //console.log('[@serveStatic] - serving 404');
            res.statusCode = 404;
            res.end();
            return next();
        }
        
        var stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
        stream.on('end', function(){
            next();
        });

        stream.on('error', function(err){
            console.log(err);
            res.statusCode = 500;
            res.end();
            next();
        })
        
    } else {
        next()
    }
}