import React,{useState,useEffect} from 'react'
import './TodoItem.css'
function TodoItem({task,student,status, handleUpdate, id, handleDelete}) {

    const[isStatus,setIsStatus]=useState()
    const[checked,setChecked]=useState()


    useEffect(() => {
        if(status===true){
            setChecked(false)
            setIsStatus(true)
        } else {
            setChecked(true)
            setIsStatus(false)
        }
    }, [status])

   
    return (
        <div className = 'Todo'>
            <input type="checkbox"  defaultChecked={isStatus} onClick={()=>handleUpdate(id, checked)} />
            {task}--{student}
            <button onClick={()=>handleDelete(id)}>Delete</button>
        </div>
    )
}

export default TodoItem
