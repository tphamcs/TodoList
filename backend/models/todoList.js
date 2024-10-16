//todoList.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
});

//database name 'todo'
const todoList = mongoose.model("todoList", todoSchema);

module.exports = todoList;
