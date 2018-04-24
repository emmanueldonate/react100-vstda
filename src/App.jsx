import React, { Component } from 'react';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state= {
      todos: [],
      text: '',
      priority: '',
    }

    this.count = 0;
    this.handleTodo =  this.handleTodo.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTodo(e) {
    this.setState({ text: e.target.value });
  }

handleSelect(e) {
  this.setState({ priority: e.target.value });
}


  handleClick(e) {
    if(this.state.text == '') {
      return false
    }

    const newTodo = {
      id: this.count++,
      text: this.state.text,
      priority: this.state.priority,
      isEditing: false,
    }
    
    let todoList = this.state.todos;
    todoList.push(newTodo);

    this.setState({ todos: todoList });

  }

  handleEdit(id) {
    var index = this.state.todos.findIndex((todo) => todo.id === id);
    var todoList = this.state.todos;
    todoList[index].isEditing = true;

    this.setState({ todos: todoList });
    
  }

  handleDelete(id) {
    let index = this.state.todos.findIndex((todo) => todo.id === id);
    let todoList = this.state.todos;
    todoList.splice(index, 1);
    
    this.setState({ todos: todoList });
  }

  handleSubmit(text, priority, id) {
    const index = this.state.todos.findIndex((todo) => todo.id === id);
    const newList = this.state.todos;
  
    newList[index].text = text;
    newList[index].priority = priority;
    newList[index].isEditing = false;



    this.setState({ todos: newList });
  }

  render() {
    return (
      <div className='container'>
        <header>
        <h1>Very Simple Todo App</h1>
        <p>Track All the things</p>
        </header>
      
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">Add a Todo on your list!</div>
              <div className="panel-body">
              <textarea className="create-todo-text" name="text" onChange={this.handleTodo}></textarea>
                <h1>How much of a priority is this?</h1>
                  <select className="create-todo-priority" name="priority" onChange= {this.handleSelect}>
                    <option value={''}>Select</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                <div className="panel-footer">
                <button className="btn btn-success btn-block create-todo" 
                value='Submit'
                onClick= {this.handleClick} >Add</button>
                </div>
              </div>
          </div>  
        </div>
      

      <div className="col-lg-8 col-md-8 col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">View Todo List</div>
          <div className="panel-body">

          <ul className="todolist"> {
            this.state.todos.map(todo => (
              <TodoList
              key={todo.id}
              onEdit= {this.handleEdit}
              submitTodo = {this.handleSubmit}
              deleteTodo = {this.handleDelete}
              todo = {todo} />

            ))}
            </ul>

            </div>
          </div>
        </div>
      </div>
      </div>
       


      
    );
  }
}

export default App;
