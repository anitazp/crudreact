import React,{useState,useEffect} from 'react'
import './TodoContainer.css'
import axios from 'axios'
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';


function TodoContainer() {
    const [isTodo,setIsTodo]=useState([])
   const[newTodo,setNewTodo]=useState(null)
   const[isUpdateId,setUpdateId]=useState(null)
   const[isDelete,setIsDelete]=useState(null)

    //GET
    const getData=async()=>{
        const res = await axios.get('http://todos-academlo.herokuapp.com/api/todos')
        setIsTodo(res.data.todos)
        console.log(res.data.todos)
    }

    useEffect(() => {
        getData()
    }, [])
    
    //POST
    useEffect(()=>{
        if(newTodo){
            const sendPost = async () => {
                const res = await axios.post(`https://todos-academlo.herokuapp.com/api/todo`, {
                task: newTodo.task,
                student: newTodo.student,
                isCompleted: newTodo.isCompleted
            })
            setIsTodo((miState) => [res.data, ...miState])
            }
            
            sendPost()
        }
       console.log(isTodo)
    },[newTodo]);

    useEffect(()=>{
        if(isUpdateId) {
            const uptData= async()=>{
               axios.put(`https://todos-academlo.herokuapp.com/api/todo/${isUpdateId.id}`,{
                    isCompleted:isUpdateId.isCompleted
                })
                getData()
                
            }
            uptData()
        }
    },[isUpdateId])

    useEffect(()=>{
        if(isDelete) {
            console.log("estoy eliminando")
            const deleteTodo= async()=>{
               await axios.delete(`https://todos-academlo.herokuapp.com/api/todo/${isDelete}`)
               
               getData()  
            }
            
            deleteTodo()
        }
    },[isDelete])

    const handleUpdate=(value,checked)=>{
        setUpdateId({
            id: value,
            isCompleted:checked
            
        })
    }

    const handleDelete=(value)=>{
       setIsDelete(value)
    }

    const mapTodo = isTodo.map((value)=>{
        return  <TodoItem task={value.task}
        student={value.student} status={value.isCompleted} key={value._id} 
        id={value._id} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
    })

  
     
    return (
        <div className = "todocontainer">
            <CreateTodo setNewTodo={setNewTodo} />
            {mapTodo}
            
        </div>
    )
}

export default TodoContainer
