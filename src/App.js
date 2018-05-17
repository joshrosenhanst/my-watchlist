import React, { Component } from 'react';
import TodoEntry from './TodoEntry';
import TodoList from './TodoList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      TodoList: [
        {id:1, text: "hey", completed:0},
        {id:2, text: "this", completed:0},
        {id:3, text: "works", completed:1},
        {id:4, text: "look how long this text is it just keeps on going forever wow 2 whole lines dude", completed:0},
      ],
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
    const TodoList = this.state.TodoList;
    this.setState({
      TodoList: TodoList.filter((item) => item.id !== id)
    });
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
            removeTodoItem={(id) => this.removeTodoItem(id)}
            checkTodoItem={(id, value) => this.checkTodoItem(id, value)}
          />
        </main>
      </div>
    );
  }
}

export default App;
