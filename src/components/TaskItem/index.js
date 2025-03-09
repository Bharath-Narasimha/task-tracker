import './index.css'
import { MdOutlineDelete } from "react-icons/md";

const TaskItem=props=>{
    const {task,id,deletetaskitem}=props;   
     const deleteTask=()=>{ 
        deletetaskitem(id);
    }
     return (
        <li>
        <p>{task}</p>
        <button className='del'  onClick={deleteTask}><MdOutlineDelete className='icon'/></button>

        </li>
    )
}
export default TaskItem
