import React from 'react'
import './CreateTodo.css'
import {useForm} from 'react-hook-form'
import { reset } from 'axe-core';

function CreateTodo({setNewTodo}) {
    const {register, handleSubmit,reset}=useForm();

    const getSubmit=(value)=>{
        
        setNewTodo({
            task: value.task,
            student: value.student,
            isCompleted: false
        })
        setNewTodo(null)
        reset()
    }
    return (
        <div className = "input">
            <form onSubmit={handleSubmit(getSubmit)}>
                <div className = "input_">
                    <input type="text" ref={register} name="task" placeholder="write task"/>
                    <input type="text" ref={register} name="student" placeholder ="write name student "/>
                </div>
                <button>ADD</button>
            </form>
        </div>
    )
}

export default CreateTodo
