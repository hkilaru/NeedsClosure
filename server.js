var express = require('express');
var taskFuncs = require('./helpers.js');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/node_modules"));
app.use(bodyParser.json());

console.log(__dirname + "/node_modules");


app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});



app.get('/api/tasks', function(req, res){
	//handle getAll tasks
	console.log("request received at getAllTasks");
	taskFuncs.getAllTasks(res);

})

app.post('/api/tasks', function(req, res){
	//handle add task
	//need to check format of req.body
	//need to have proper res.end (should send 201)
	var task = req.body;
	taskFuncs.addTask(task, res);

})

app.delete('/api/tasks', function(req, res){
	/* proper format of request:

		{
			"id": "5783ec2a12cda2db6ce7ac91"
		}

	*/
	console.log("request received at deleteTask");
	taskFuncs.deleteTask(req.body.id, res);
})

app.put('/api/tasks', function(req, res){
	//handle complete task
	//format of request same as delete request
	console.log("request received at completeTask for:", req.body.id);
	taskFuncs.completeTask(req.body.id, res);
})

module.exports = app;
