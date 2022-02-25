import React from 'react'
import styles from '../styles/TodoList.css'
import Edit from './Edit'

function TodoList(props) {
  const removeTodo = (todo_id) => {
    props.deleteTodo(todo_id);
  }
  const completedTask = (todo,event) => {
    if(props.showAll){
        
        const element = event.target;
        element.classList.toggle("crossed-line")
    }
    todo.completed = !todo.completed;
    props.completedTask(todo);
  }

  const editTodo = (todo) => {
    props.onEdit(todo);
  }

  const todos = props.todos && props.todos.map(todo => {
    if(todo.completed && props.showAll){
      return (
          <div className='todo-list' key={todo.id}>
              <div className='ui three column very relaxed grid'>
                  <div className='column'>
                      <p className='crossed-line item' onClick={(event)=>completedTask(todo,event)}>{todo.description}</p>
                  </div>
                  <div className='column'>
                    <Edit className = 'edit' todo = {todo} onEdit = {editTodo}/>
                  </div>
                  <div className='column'>
                      <button className = 'btn btn-danger delete' type='submit' onClick = {()=>removeTodo(todo.id)}>Delete</button>
                  </div>
              </div>
          </div>
      )
  }
  else{
    return (
        <div className='todo-list' key={todo.id}>
            <div className='ui three column very relaxed grid'>
                <div className='column'>
                    <p className='item' onClick={(event)=>completedTask(todo,event)}>{todo.description}</p>
                </div>
                <div className='column'>
                    <Edit className = 'edit' todo = {todo} onEdit = {editTodo}/>
                </div>
                <div className='column'>
                    <button className = 'btn btn-danger delete' type='submit' onClick = {()=>removeTodo(todo.id)}>Delete</button>
                </div>
            </div>
        </div>
        )
    }
  })
  if(props.todos){
    return (
        <div>
            <div className='divStyle'>
                <p className='todo-count'>No of todos : {props.todos.length}</p>
            </div>
            {todos}
        </div>
      
    )
  }
  else{
      return (
          <div></div>
      )
  }
  
}

export default TodoList