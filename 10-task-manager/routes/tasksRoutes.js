var express = require('express');
var router = express.Router();

var taskList = [
    {id : 1, name : 'Learn Node.js', isCompleted : false},
    {id : 2, name : 'Master JavaScript', isCompleted : true},
    {id : 3, name : 'Explore New Zealand', isCompleted : false}
];

router.get('/', function(req, res, next){
    res.json(taskList);
});

module.exports = router;