
var  querystring = require('querystring'),
    calculator = require('./calculator');

module.exports = function serveCalculator(req, res, next){
    if (req.urlObj.pathname === '/calculator'){
        var data = req.method === 'GET' ? req.queryData : req.bodyData;
        var op = data.op,
            x = parseInt(data.x),
            y = parseInt(data.y),
            result = calculator[op](x,y);
        console.log('[@serveCalculator] - serving calculator result');
        res.write(result.toString());
        res.end();
        next();
    }  else {
        next();
    }
}