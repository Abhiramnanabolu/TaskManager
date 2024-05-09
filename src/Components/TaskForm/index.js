import React, { useState } from 'react';

const TaskForm = (props) => {
    const {handleAddTask}=props
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            completed: false
        };
    
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        const updatedTasks = [newTask, ...existingTasks]; 
    
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        handleAddTask(updatedTasks)
        console.log(updatedTasks);
        setTitle('');
        setDescription('');
        setPriority('');
        setDueDate('');
    };
    

    return (
        <div className="bg-white p-4 rounded-lg w-1/3 box-border border-1 h-min mt-4 font-[Inter]">
            <h2 className="text-lg font-semibold mb-2">Add Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="title" className="mt-1 p-2 border border-gray-300 rounded-md w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" rows="3" className="mt-1 p-2 border border-gray-300 rounded-md w-full" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                    <select id="priority" className="mt-1 p-2 border border-gray-300 rounded-md w-full" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input type="date" id="dueDate" placeholder='DD-MM-YY' className="mt-1 p-2 border border-gray-300 rounded-md w-full" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                </div>
                <button type="submit" className="bg-black text-white px-4 py-2 mt-6 rounded-md">Add Task</button>
            </form>
        </div>
    );
}

export default TaskForm;
