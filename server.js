var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



var taskDatabase = [
	{id: "task 1", task: "walk the dog"},
	{id: "task 2", task: "take the garbage out"}
];

app.get("/", (req, res) => {
	let templateVars = {
	taskDatabase: taskDatabase
	};
	res.render("header", templateVars)
});

app.get("/tasks", (req, res) => {
	res.send("hello");
});


app.get("/tasks/new", (req, res) => {
	res.render("task_new")
});

app.post("/tasks/list", (req, res) => {
	console.log(req.body);
	let task = req.body['task-name'];
	let id = req.body['task-id'];
	let newTask = {
		task: task,
		id: id
	};
	taskDatabase.push(newTask);
	res.redirect("/");
})

app.post("/tasks/:id/delete", (req, res) => {
	let i = taskDatabase.findIndex((taskObject) => {
		if (taskObject == req.params.id) {
			delete taskObject;
		}
	});

	res.redirect("/");
})

app.get("/tasks/:id", (req, res) => {
	let templateVars = {taskID: req.params.id};
	res.render("task_show",templateVars);
});



app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});