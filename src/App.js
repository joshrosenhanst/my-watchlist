import React, { Component } from 'react';
import update from 'immutability-helper';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TodoEntry from './TodoEntry';
import TodoList from './TodoList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      TodoList: this.getTodoListStorage(),
      nextID: this.getNextIDStorage(),
      /*TodoList: [
        {id:1, text: "hey", completed:0},
        {id:2, text: "this", completed:0},
        {id:3, text: "works", completed:1},
        {id:4, text: "look how long this text is it just keeps on going forever wow 2 whole lines dude", completed:0},
      ],*/
    };
  }

  getTodoListStorage() {
    let storage = localStorage.getItem("todo-app-todolist");
    return JSON.parse(storage) || [];
  }

  getNextIDStorage() {
    return parseInt(localStorage.getItem("todo-app-nextid")) || 0;
  }

  updateStorage(data,nextID){
    localStorage.setItem("todo-app-todolist", JSON.stringify(data));
    localStorage.setItem("todo-app-nextid", nextID);
  }

  addWatchItem(watchItem) {
    let updatedID = parseInt(this.state.nextID) + 1;
    let updatedList = this.state.TodoList.concat([{
      id:updatedID, 
      watchItem:watchItem
    }]);
    this.setState({
      TodoList: updatedList,
      nextID: updatedID
    });
    this.updateStorage(updatedList, updatedID);
  }

  addTodoItem(text) {
    let updatedID = parseInt(this.state.nextID) + 1;
    let updatedList = this.state.TodoList.concat([{
      id:updatedID, 
      text:text
    }]);
    this.setState({
      TodoList: updatedList,
      nextID: updatedID
    });
    this.updateStorage(updatedList, updatedID);
  }

  removeTodoItem(id) {
    let updatedList = this.state.TodoList.filter((item) => item.id !== id);
    this.setState({
      TodoList: updatedList
    });
    this.updateStorage(updatedList, this.state.nextID);
  }

  checkTodoItem(id,value) {
    const completed = value ? 1:0;
    //clone the array and then map the cloned array to set completed on the matching ID
    const TodoList = this.state.TodoList.slice(0);
    let updatedList = TodoList.map((item) => item.id !== id ? item : {...item, completed:completed});
    this.setState({
      TodoList: updatedList
    });
    this.updateStorage(updatedList, this.state.nextID);
  }

  render() {
    const todoList = this.state.TodoList;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Watch List</h1>
          <TodoEntry 
            addTodoItem={(text) => this.addTodoItem(text)} 
            addWatchItem={(watchItem) => this.addWatchItem(watchItem)} 
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
