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

router.get('/:id', function(req, res, next){
    var resultTask = taskList.find(function(task){
        return task.id === parseInt(req.params.id);
    });
    if (!resultTask){
        res.status(404).end();
    } else {
        res.json(resultTask);
    }
});

router.post('/', function(req, res, next){
    var postedTask = req.body;
    taskList.push(postedTask);
    res.status(201).json(postedTask);
});

router.put('/:id', function(req, res, next){
    var updatedTask = req.body,
        updatedTaskId = parseInt(req.params.id);

    var taskToUpdate = taskList.find(function(task){
        return task.id === updatedTaskId;
    });

    if (taskToUpdate){
        taskList = taskList.map(function(task){
            return task.id === updatedTaskId ? updatedTask : task;
        });
        return res.json(updatedTask);
    } else {
        res.status(404).end();
    }
});

router.delete('/:id', function(req, res, next){
    var deletedTaskId = parseInt(req.params.id);

    var taskToDelete = taskList.find(function(task){
        return task.id === deletedTaskId;
    });

    if (taskToDelete){
        taskList = taskList.filter(function(task){
            return task.id !== deletedTaskId;
        });
        return res.json({});
    } else {
        res.status(404).end();
    }
})

module.exports = router;