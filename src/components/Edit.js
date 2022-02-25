import axios from 'axios';
import React, { Component } from 'react'
import styles from '../styles/Edit.css'

class Edit extends Component {
  state = {input:this.props.todo.description}
  inputChange = (event)=>{
    this.setState({input : event.target.value});
      
  }
  submitText = (value,todo) => {
      todo.description = value
      this.props.onEdit(todo);
      this.setState({input:""});
  }
  render() {
    return (
        <div >
        <button type="submit" className="edit btn btn-default" data-toggle="modal" data-target={`#id${this.props.todo.id}`}>Edit</button>
        
        
        <div id={`id${this.props.todo.id}`} className="divStyle modal">
          <div className="modal-dialog">
        
        
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Edit Todo</h4>
              </div>
              <div className="modal-body">
                <div className="ui form">
                  <div className = "divStyle field">
                    <label>User Input</label>
                    <input className = "edit-todo divStyle" type="text" onChange={this.inputChange} value = {this.state.input}/>
                  </div>
                </div>
              </div>
              <div className = "divStyle" class="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className="edit-submit btn btn-primary" data-dismiss="modal" onClick={()=>this.submitText(this.state.input,this.props.todo)}>Edit</button>
              </div>
            </div>
        
          </div>
        </div>
              </div>
    )
  }
}

export default Edit
