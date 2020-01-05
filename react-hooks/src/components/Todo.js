import React, {useState, useEffect} from 'react';
import axios from 'axios';

const todo = props => {

    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

    useEffect(()=>{
        axios.get('https://test-38c9e.firebaseio.com/todos.json')
            .then(res => {
                console.log(res)
                const todoData = res.data;
                const todos = []
                for(const key in todoData){
                    todos.push({id : key, name : todoData[key].name})
                }
                console.log(todos)
                setTodoList(todos)

            })
            .catch(err => console.log(err))
        return () => {
            console.log('Cleanup')
        }
    },[]);

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY)
    }

    useEffect(() => {
        document.addEventListener('mouseover',mouseMoveHandler)
        return () => {
            document.removeEventListener('mouseover', mouseMoveHandler)
        }
    },[])

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value)
    }

    const todoAddHandler = () => {
         setTodoList(todoList.concat(todoName))
         axios.post('https://test-38c9e.firebaseio.com/todos.json',{name : todoName})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <React.Fragment>
            <input 
                type = 'text' 
                placeholder = 'Todo'
                value = {todoName.name}
                onChange = {inputChangeHandler} />
            <button type = "button" onClick = {todoAddHandler} >Add</button>
            <ul>
                {todoList.map(todo => 
                    <li key = {todo.id}>{todo.name}</li>)}
            </ul>
        </React.Fragment>
    )
   
}

export default todo;