import React, { useState } from 'react';
import Task from "../Task";

const TaskList = (props) => {
    const { tasks, handleDeleteTask, handleProgress, handleEdit } = props;
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState(null);

    const deleteTask = (taskId) => {
        handleDeleteTask(taskId);
    };

    const filterTasks = (task) => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
    };

    const sortTasks = (taskA, taskB) => {
        if (sortBy === 'priority') {
            return taskA.priority.localeCompare(taskB.priority);
        } else if (sortBy === 'dueDate') {
            return new Date(taskA.dueDate) - new Date(taskB.dueDate);
        } else {
            return 0;
        }
    };

    return (
        <div className="box-border w-2/3 bg-blacka border-1 mt-4 mr-4 rounded pb-4 font-[Inter] pt-4">
            <div className='flex justify-center ml-6 gap-8 mb-6'>
                <div>
                    <label htmlFor="filter">Filter by:</label>
                    <select id="filter" className='border-1 ml-2 p-1' value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="sortBy">Sort by:</label>
                    <select id="sortBy" className='border-1 ml-2 p-1'  value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">None</option>
                        <option value="priority">Priority</option>
                        <option value="dueDate">Due Date</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
                {tasks
                    .filter(filterTasks)
                    .sort(sortTasks)
                    .map(eachItem => (
                        <Task
                            key={eachItem.id}
                            data={eachItem}
                            deleteTask={deleteTask}
                            handleProgress={handleProgress}
                            handleEdit={handleEdit}
                        />
                    ))}
            </div>
            {tasks.length === 0 && (
                <div className="flex flex-col items-center justify-center text-xl font-semibold font-[Inter] mt-2">
                    <img className="w-1/3" src="https://res.cloudinary.com/dbs6hvga4/image/upload/v1715247419/9318688_whfaly.jpg" alt="No tasks" />
                    <h1>You have no Tasks !!</h1>
                </div>
            )}
        </div>
    );
};

export default TaskList;
