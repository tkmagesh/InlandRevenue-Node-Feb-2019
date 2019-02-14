
var  querystring = require('querystring'),
    calculator = require('./calculator');

module.exports = function serveCalculator(req, res, next){
    if (req.urlObj.pathname === '/calculator' && req.method === 'GET'){
        var data = req.queryData;
        var op = data.op,
            x = parseInt(data.x),
            y = parseInt(data.y),
            result = calculator[op](x,y);
        console.log('[@serveCalculator] - serving calculator result');
        res.write(result.toString());
        res.end();
        next();
    } else if (req.urlObj.pathname === '/calculator' && req.method === 'POST'){
        var data = req.bodyData;
        var op = bodyData.op,
            x = parseInt(bodyData.x),
            y = parseInt(bodyData.y),
            result = calculator[op](x,y);

        res.write(result.toString());
        res.end();
        next();
    } else {
        next();
    }
}