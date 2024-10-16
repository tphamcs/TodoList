import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [newTask, setNewTask] = useState("");
    
    // Fetch tasks from database
    useEffect(() => {
        axios.get('http://localhost:3001/getTodoList')
            .then(result => {
                setTodoList(result.data)
            })
            .catch(err => console.log(err))
    }, [])


    // Function to add task to the database
    const addTask = (e) => {
        e.preventDefault();
        if (!newTask) {
            alert("All fields must be filled out.");
            return;
        }        
        
        axios.post('http://localhost:3001/addTodoList', { task: newTask} )
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    }


    // Delete task from database
    const deleteTask = (id) => {
        axios.delete('http://localhost:3001/deleteTodoList/' + id)
            .then(result => {
                console.log(result);
                window.location.reload();
            })
            .catch(err =>
                console.log(err)
            )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead className="table-primary">
                            <tr>
                                <th>Task</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {Array.isArray(todoList) ? (
                            <tbody>
                                {todoList.map((data) => (
                                    <tr key={data._id}>

                                        <td className="col-md-8">{data.task}</td>

                                        <td className="col-md-4">
                                            <button className="btn btn-danger btn-sm ml-1" onClick={() => deleteTask(data._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <div></div>
                        )}

                    </table>
                </div>
  

                {/* Add Task */}
                <div className="col-md-5">
                    <form className="bg-light p-4">
                        <div className="mb-3">
                            <label>Enter Task</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Ex: Cooking"
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </div>

                        <button onClick={addTask} className="btn btn-success btn-sm">
                            Add Task
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Todo;
