import React, { Component } from 'react';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.handleTodo =  this.handleTodo.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.submitTodo = this.submitTodo.bind(this);
        


        this.state = {
            text: '',
            priority: ''
        }
    }
    
  handleTodo(e) {
    this.setState({ text: e.target.value });
  }

    handleSelect(e) {
  this.setState({ priority: e.target.value });
}

    editHandler() {
        this.setState({ text: this.props.todo.text });
        this.props.onEdit(this.props.todo.id);
    }

    deleteTodo() {
        this.props.deleteTodo(this.props.todo.id);
    }

    submitTodo(event) {
        this.props.submitTodo(this.state.text, 
        this.state.priority, 
        this.props.todo.id);
    }


    render() {
        if (this.props.todo.priority == 1) {
            var priority = 'alert-success';
        } else if (this.props.todo.priority == 2) {
            var priority = 'alert-info';
        } else {
            var priority = 'alert-danger';
        }
         if (this.props.todo.isEditing === true) {
    
    return (
        <div className="alert alert-success" >
        <h6><strong>Description</strong></h6>
        <textarea className="update-todo-text" name="text" defaultValue={this.props.todo.text} onChange={this.handleTodo}></textarea>
                <h1>How much of a priority is this?</h1>
                  <select className="update-todo-priority" defaultValue={this.props.todo.priority} onChange= {this.handleSelect}>
                    <option value= {''}>Select Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
                  <button className="btn btn-success btn-block update-todo" 
                value="Submit"
                onClick= {this.submitTodo} >Save</button>
                  </div>)
} else {
    return(
        <li className= {`alert ${priority}`}>
        <input className="form-check-input" type="checkbox" id="inlineCheckbox2" />
        {this.props.todo.text}
        <button className="fa fa-trash pull-right delete-todo" aria-hidden="true" onClick= {this.deleteTodo}></button>
        <button className= "fa fa-pencil-square-o pull-right edit-todo" aria-hidden="true" onClick= {this.editHandler}></button>
        </li>);
}
    }
}


export default TodoList;