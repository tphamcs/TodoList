//server.js

require ('dotenv'). config ();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require("./models/todoList")

var app = express();
app.use(cors());
app.use(express.json());


// Connect to your MongoDB database (replace with your database URL)
mongoose.connect(process.env.DB_URI);

// Check for database connection errors
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

// Get saved tasks from the database
app.get("/getTodoList", (req, res) => {
    
    TodoModel.find({})
        .then((todoList) => res.json(todoList))
        .catch((err) => res.json(err))
});

// Add new task to the database
app.post("/addTodoList", (req, res) => {
    console.log(req);
    console.log(res);
    TodoModel.create({
        task: req.body.task,
    })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});


// Delete task from the database
app.delete("/deleteTodoList/:id", (req, res) => {
    const id = req.params.id;
    TodoModel.findByIdAndDelete({ _id: id })
        .then((todo) => res.json(todo))
        .catch((err) => res.json(err));
});


app.listen(3001, () => {
    console.log('Server running on 3001');
});
