import { useState, useEffect } from 'react';
import './index.css'
import TaskItem from '../TaskItem';

const TaskManager = (props) => {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setTask] = useState('');

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            try {
                setTaskList(JSON.parse(storedTasks));
            } catch (error) {
                console.error("Error parsing tasks from local storage:", error);
                localStorage.removeItem('tasks');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }, [taskList]);

    const taskChange = (event) => {
        setTask(event.target.value);
    };

    const submitTask = () => {
        if (newTask.trim() !== "") {
            setTaskList(prevTasks => [
                ...prevTasks,
                { taskname: newTask, id: Date.now() } 
            ]);
            setTask('');
        }
    };

    const deleteTaskItem = (taskId) => {
        setTaskList(prevTasks => prevTasks.filter(each => each.id !== taskId));
    };

    return (
        <div className="task-manager">
            <h1 className="heading">Task Tracker</h1>
            <div className="input-container">
                <input
                    className="input"
                    type='text'
                    placeholder='Add a new task...'
                    onChange={taskChange}
                    value={newTask}
                />
                <button className="input-button" onClick={submitTask}>Add Task</button>
            </div>
            <ul>
                {taskList.map(each => (
                    <TaskItem
                        task={each.taskname}
                        id={each.id}
                        key={each.id}
                        deletetaskitem={deleteTaskItem}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
