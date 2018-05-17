import React, { Component } from 'react';
import TodoEntry from './TodoEntry';
import TodoList from './TodoList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      TodoList: [
        {id:1, text: "hey"},
        {id:2, text: "this"},
        {id:3, text: "works"},
      ]
    };
  }

  addTodoItem(text) {
    const TodoList = this.state.TodoList;
    this.setState({
      TodoList: TodoList.concat([{
        id:TodoList.length + 1, 
        text:text
      }])
    })
  }

  removeTodoItem(id) {

  }

  render() {
    const todoList = this.state.TodoList;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Todo App</h1>
          <TodoEntry 
            addTodoItem={(text) => this.addTodoItem(text)} 
          />
        </header>
        <main className="App-main">
          <TodoList 
            todoList={todoList}
          />
        </main>
      </div>
    );
  }
}

export default App;
