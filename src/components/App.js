import React, { Component } from 'react'
import CreateTodo from './CreateTodo'
import TodoList from './TodoList'
import axios from 'axios'
import styles from '../styles/App.css'

class App extends Component {
    state = {
        todoList : [],
        activeTodoList : [],
        completedList: [],
        todo : "",
        all:false,
        active: false,
        completed: false
    }
    newTodo = (todo) => {
      console.log(todo);
      const todoObject = {description: todo, completed: false};
      axios.post('http://localhost:3000/todos',todoObject).then(res => {
        this.setState({
          todoList: [...this.state.todoList,res.data]
        })
      })
        
    }

    showAll = () => {
      axios.get('http://localhost:3000/todos').then(res => {
        this.setState({
          todoList: res.data
        })
      })
      this.setState({
        all: true,
        active: false,
        completed: false
      })
    }

    showActive = () => {
      axios.get('http://localhost:3000/todos').then(res => {
        this.setState({
          todoList: res.data
        })
        const active = this.state.todoList.filter(todo => todo.completed !== true)
        this.setState({
          activeList: active
        })
      })
      
      this.setState({
        all: false,
        active: true,
        completed: false
      })
    }

    showCompleted = () => {
        axios.get('http://localhost:3000/todos').then(res => {
          this.setState({
            todoList: res.data
          })
          const completed = this.state.todoList.filter(todo => todo.completed === true)
          console.log(completed);
          this.setState({
            completedList: completed
          })
        })
      this.setState({
        all: false,
        active: false,
        completed: true
      })
    }

    complete = (todoToBeRemoved) => {
      axios.put(`http://localhost:3000/todos/${todoToBeRemoved.id}`,todoToBeRemoved).then(res => {
        
      })
      let isActive = todoToBeRemoved.completed;
      var newList = this.state.todoList; 
      for(var i=0;i<newList.length;i++){
        if(newList[i].id === todoToBeRemoved.id ){
          newList[i] = todoToBeRemoved;
        }
      }
      var updatedList;
      if(isActive){
        updatedList = this.state.activeTodoList.filter(todo => todo.id!==todoToBeRemoved.id);
      }
      else{
        updatedList = [...this.state.activeTodoList,todoToBeRemoved]
      }
  
      var completedList;
      if(!isActive){
        completedList = this.state.completedList.filter(todo => todo.id !== todoToBeRemoved.id);
      }
      else{
        completedList = [...this.state.completedList,todoToBeRemoved];
      }
      
      this.setState({
          activeTodoList:updatedList,
          todoList:newList,
          completedList: completedList
      });
    }
    
    delete = (id) => {
      axios.delete(`http://localhost:3000/todos/${id}`).then(res => {
        
      })
      var newList = this.state.todoList.filter(todo => todo.id!==id);
      
      this.setState({
          todoList:newList,
          activeTodoList:newList
      });
    }

    edit = (todo) => {
      console.log(todo);
      axios.put(`http://localhost:3000/todos/${todo.id}`,todo).then(res => {
        
      })
      var todoList = this.state.todoList;
      for(let i=0; i<todoList.length; i++){
        if(todoList[i].id === todo.id){
          todoList[i] = todo
        }
      }
      var activeList = this.state.activeTodoList;
      for(let i=0; i<activeList.length; i++){
        if(activeList[i].id === todo.id){
          activeList[i] = todo
        }
      }
    var completedList = this.state.completedList;
    for(let i=0; i<completedList.length; i++){
      if(completedList[i].id === todo.id){
        completedList[i] = todo
      }
    }
    this.setState({
      todoList: todoList,
      activeTodoList: activeList,
      completedList: completedList
    })
  }

  render() {
    return (
      <div className='divStyle'>
          <div className='center'>
            <h1 className='textStyle'>To-Do</h1>
          </div>
          <CreateTodo getTodoValue = {this.newTodo}/>
          <button className = 'show-all buttonStyle btn btn-default' type= 'submit' onClick={this.showAll}>Display all tasks</button>
          <button className = 'show-active buttonStyle btn btn-default' type= 'submit' onClick={this.showActive}>Display active tasks</button>
          <button className = 'show-completed buttonStyle btn btn-default' type= 'submit' onClick={this.showCompleted}>Display completed tasks</button>
          {this.state.all && <TodoList className = 'main' todos = {this.state.todoList} showAll = {this.state.all} completedTask = {this.complete} deleteTodo = {this.delete} onEdit = {this.edit}/>}
          {this.state.completed && <TodoList className = 'main' todos = {this.state.completedList} showAll = {this.state.all} completedTask = {this.complete} deleteTodo = {this.delete}/> }
          {this.state.active && <TodoList className = 'main' todos = {this.state.activeList} showAll = {this.state.all} completedTask = {this.complete} deleteTodo = {this.delete}/> }
      </div>
    )
  }
}

export default App