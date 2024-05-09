import './App.css';
import EditTask from './Components/EditTask';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [toEdit,setToEdit]=useState({});

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    const handleAddTask = (newTasks) => {
        setTasks(newTasks)
    };

    const handleEditTask = (editedTask) => {
        const index = tasks.findIndex(task => task.id === editedTask.id);
        const updatedTasks = [...tasks];
        updatedTasks[index] = editedTask;
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };


    const handleProgress = (taskId) => {
      const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
              return { ...task, completed: !task.completed };
          }
          return task;
      });
  
      const taskIndex = updatedTasks.findIndex(task => task.id === taskId);
  
      if (taskIndex === -1) {
          return;
      }
  
      const updatedTasks2 = [
          ...updatedTasks.slice(0, taskIndex),
          ...updatedTasks.slice(taskIndex + 1),
          updatedTasks[taskIndex]
      ];
  
      setTasks(updatedTasks2);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks2));
  };
  

    const handleDeleteTask=(taskId)=>{
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    const handleEdit=(data)=>{
        setEdit(true)
        setToEdit(data)
    }

    const onSave=(editedTask)=>{
        handleEditTask(editedTask)
    }

    const onClose=()=>{
        setEdit(false)
    }

  return (
    <div className='box-border'>
        <div className='bg-black'>
            <h1 className='p-4 ml-6 font-semibold text-xl text-white font-[Inter]'>TaskManager</h1>
        </div>
        <div className="flex pt-0 p-4">
            <TaskList tasks={tasks} handleDeleteTask={handleDeleteTask} handleProgress={handleProgress} handleEdit={handleEdit}/>
            <TaskForm handleAddTask={handleAddTask}/>
        </div>
        {edit?<EditTask task={toEdit} onClose={onClose} onSave={onSave}/>:""}
        
    </div>
  );
}

export default App;
