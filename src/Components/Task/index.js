import "./index.css"

function formatDate(dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = months[monthIndex];
    return `${monthName} ${parseInt(day, 10)}, ${year}`;
  }

const Task=(props)=>{
    const{data,deleteTask,handleProgress,handleEdit}=props
    const {id,title,description,dueDate,completed,priority}=data;

    const handleDelete = (taskId) => {
        deleteTask(taskId);
    };

    const handleEditClick = (data) => {
        handleEdit(data);
    };
    
    let priorityItem;
    if(priority==="low"){
        priorityItem=<li className="flex gap-3 mt-3  text-base text-slate-600">
            <img alt="p" src="https://res.cloudinary.com/dbs6hvga4/image/upload/v1715233188/flag_24dp_FILL0_wght400_GRAD0_opsz24_1_tzjtwm.svg"/>
            <p>Low Priority</p>
        </li>
    }
    else if(priority==="medium"){
        priorityItem=<li className="flex gap-3 mt-3 text-base text-slate-600">
            <img alt="p" src="https://res.cloudinary.com/dbs6hvga4/image/upload/v1715233188/flag_24dp_FILL0_wght400_GRAD0_opsz24_2_kqmhkf.svg"/>
            <p>Medium Priority</p>
        </li>
    }
    else{
        priorityItem=<li className="flex gap-3 mt-3 text-base text-slate-600">
        <img alt="p" src="https://res.cloudinary.com/dbs6hvga4/image/upload/v1715233189/flag_24dp_FILL0_wght400_GRAD0_opsz24_avbyml.svg"/>
        <p>High Priority</p>
    </li>
    }
    let progressItem;
    if(completed){
        progressItem=<li className="flex gap-3 mt-3 text-base text-slate-600">
        <img alt="c" src="https://res.cloudinary.com/dbs6hvga4/image/upload/v1715234821/task_alt_24dp_FILL0_wght400_GRAD0_opsz24_pdxs8q.svg"/>
        <p>Completed</p>
    </li>
    }
    else{
        progressItem=<li className="flex gap-3 mt-3 text-base text-slate-600">
        <img alt="c" src="https://res.cloudinary.com/dbs6hvga4/image/upload/v1715234663/pending_24dp_FILL0_wght400_GRAD0_opsz24_zxvvxk.svg"/>
        <p>In Progress</p>
    </li>
    }
    return(
        <div className="task-div p-5 w-96 border-1 rounded-lg font-[Inter] drop-shadow ">
            <div className="">
                <h1 className={`text-black text-xl font-semibold ${completed ? "line-through":""}`}>{title}</h1>
                <p className={`text-sm mt-1 text-slate-500 ${completed ? "line-through":""}`}>{description}</p>
                <ul className="mt-6">
                    {priorityItem}
                    <li className="flex gap-3 mt-3 text-base text-slate-600">
                        <img alt="d" src="https://res.cloudinary.com/dbs6hvga4/image/upload/v1715233976/event_24dp_FILL0_wght400_GRAD0_opsz24_jop9hz.svg"/>
                        <p>Due: {formatDate(dueDate)}</p>
                    </li>
                    {progressItem}
                </ul>
            </div>
            <div className="flex justify-between items-center mt-8">
                <div>
                    <input className="w-5 h-5" type="checkbox" checked={completed} onChange={()=>handleProgress(id)}/>
                </div>
                <div className="flex gap-3 text-sm">
                    <button  onClick={()=>handleEditClick(data)} className="border-1 px-4 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(id)} className="border-1 px-4 py-1 rounded bg-black text-white">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Task