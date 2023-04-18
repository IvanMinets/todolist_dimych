import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Redux2", isDone: false}
    ]);

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => {
            return t.id !== id;
        })
        setTasks(filteredTasks)
    }

    function addTask(title: string){
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodolist = tasks;

    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus = {changeStatus}
            />
        </div>
    );
}

export default App;

