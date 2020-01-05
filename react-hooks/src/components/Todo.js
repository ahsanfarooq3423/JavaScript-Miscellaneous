import React, { useState , useEffect, useReducer, useRef, useMemo} from 'react';
import axios from 'axios';
import List from './List';
import { useFormInput } from '../hooks/forms';

const todo = props => {
    const [inputIsValid, setInputIsValid] = useState(false);
    //const [todoName, setTodoName] = useState('');
    //const [submittedTodo, setSubmittedTodo] = useState(null);
    //const [todoList, setTodoList] = useState([]);

    // const todoInputRef = useRef();

    const todoInput = useFormInput();

    const todoListReducer = (state, action) => {
        switch(action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            default:
                return state;
        }
    }

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(()=>{
        axios.get('https://test-38c9e.firebaseio.com/todos.json')
            .then(res => {
                console.log(res)
                const todoData = res.data;
                const todos = []
                for(const key in todoData){
                    todos.push({id : key, name : todoData[key].name})
                }
                dispatch({type : 'SET', payload : todos})
            })
            .catch(err => console.log(err))
        return () => {
            console.log('Cleanup')
        }
    },[]);

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY)
    }

    const inputValidationHandler = event => {
        if (event.target.value.trim() === ""){
            setInputIsValid(false);
        } else {
            setInputIsValid(true);
        }
    }


    // useEffect(() => {
    //     document.addEventListener('mouseover',mouseMoveHandler)
    //     return () => {
    //         document.removeEventListener('mouseover', mouseMoveHandler)
    //     }
    // },[])

    // useEffect(() => {
    //     if (submittedTodo){
    //         dispatch({type : 'ADD', payload : submittedTodo})
    //     }
    // }, [submittedTodo])

    // const inputChangeHandler = (event) => {
    //     setTodoName(event.target.value)
    // }

    const todoAddHandler = () => {
        const todoName = todoInput.value;

         axios.post('https://test-38c9e.firebaseio.com/todos.json',{name : todoName})
            .then(res => {
                setTimeout(()=> {
                    const todoItem = {id : res.data.name, name : todoName}
                    dispatch({type : 'ADD', payload : todoItem})
                }, 3000);
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const todoRemoveHanlder = todoId => {
        axios.delete(`https://test-38c9e.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({type : 'REMOVE', payload : todoId})
            })
            .catch(err => console.log(err))
    }

    return (
        <React.Fragment>
            <input 
                type = 'text' 
                placeholder = 'Todo'
                onChange = {todoInput.onChange}
                value = {todoInput.value}   
                style = {{background : todoInput.validity === true ? 'transparent': 'red'}}
                />
            <button type = "button" onClick = {todoAddHandler} >Add</button>
            {useMemo(()=>(<List items = {todoList} onClick = {todoRemoveHanlder}/>), [todoList] ) }
        </React.Fragment>
    )
   
}

export default todo;