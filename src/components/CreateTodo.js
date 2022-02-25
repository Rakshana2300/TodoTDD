import React, { Component } from 'react'
import styles from '../styles/CreateTodo.css'

class CreateTodo extends Component {
  state = {
    todo: ''
  }
  handleInputChange = (event)=>{
    this.setState({
      todo:event.target.value,
    })
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.getTodoValue(this.state.todo);
    this.setState({todo : ''});
  }
  render(){
    return (
      <div>
          <form className = 'ui form' >
            <div className='divStyle'>
              <label>Enter the work to be done:</label>
              <input type = 'text' className = 'new-todo' placeholder='Enter the task to be done' onChange={this.handleInputChange} value = {this.state.todo} required/>
            </div>
            <button className='btn btn-default add-todo' type = 'submit' onClick={this.onSubmit}>Add</button>
          </form>
          
      </div>
    )
  }
  
}

export default CreateTodo