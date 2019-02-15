var chalk = require('chalk');

module.exports = function(req, res, next){
    var startTime = new Date();
    res.on('finish', function(){
        var endTime = new Date();
        var delta = endTime - startTime;
        console.log(chalk.red(req.method) + '\t' + chalk.magenta(req.urlObj.pathname) + '\t\t' + chalk.cyan(res.statusCode) + '\t' + chalk.bold(delta) + 'ms');
    });
    next();
}