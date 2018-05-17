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
    this.setState({
      TodoList: this.state.TodoList.concat([{
        id:this.state.TodoList.length + 1, 
        text:text
      }])
    })
  }

  removeTodoItem(id) {
    this.setState({
      TodoList: this.state.TodoList.filter((item) => item.id !== id)
    });
  }

  checkTodoItem(id,value) {
    const completed = value ? 1:0;
    //clone the array and then map the cloned array to set completed on the matching ID
    const TodoList = this.state.TodoList.slice(0);
    let updatedList = TodoList.map((item) => item.id !== id ? item : {...item, completed:completed});
    this.setState({
      TodoList: updatedList
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
