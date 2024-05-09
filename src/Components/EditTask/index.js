import React, { useState} from 'react';
import "./index.css"

const EditTask = ({ task, onClose, onSave }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [priority, setPriority] = useState(task ? task.priority : '');
    const [dueDate, setDueDate] = useState(task ? task.dueDate : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const editedTask = {
            ...task,
            title,
            description,
            priority,
            dueDate
        };
        onSave(editedTask);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal box-border w-1/3">
                <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
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
                    <button type="submit"  className="border-1 px-4 py-1 rounded bg-black text-white mt-5">Save</button>
                    <button onClick={onClose}  className=" border-1 px-4 py-1 rounded ml-4">Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditTask;
