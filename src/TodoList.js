import React, { Component } from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(e,id){
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.props.checkTodoItem(id,value);
    }

    handleClose(e,id) {
        this.props.removeTodoItem(id);
    }

    render() {
        const todoList = this.props.todoList;
        const listItems = [];
        const completedItems = [];

        todoList.forEach((item) => {
            let renderedItem = (
                <ListItem 
                    key={item.id} 
                    value={item.text} 
                    id={item.id} 
                    handleClose={(e) => this.handleClose(e,item.id)} 
                    handleCheck={(e) => this.handleCheck(e,item.id)} 
                    checked={item.completed}
                />
            );
            if(item.completed){
                completedItems.push(renderedItem);
            }else{
                listItems.push(renderedItem);
            }
        });

        /*const listItems = todoList.map((item) => 
          <ListItem 
            key={item.id} 
            value={item.text} 
            id={item.id} 
            handleClose={(e) => this.handleClose(e,item.id)} 
            handleCheck={(e) => this.handleCheck(e,item.id)} 
            checked={item.completed}
            />
        );*/
        return (
            <div className="list-containers">
                { listItems.length == 0 ? (<h1 className="no-items">Add Todo List Items</h1>) : '' }
                    <ul className="TodoList list-element">{listItems}</ul>
                <hr />
                <ul className="CompletedList list-element">{completedItems}</ul>
            </div>
        );
    }
}

class ListItem extends React.Component {

    render() {
        return (
            <li className="notification">
                <button className="delete remove-todo-item" onClick={this.props.handleClose}></button>
                <input type="checkbox" className="check-todo-item" checked={this.props.checked} onChange={this.props.handleCheck} />
                <div className="todo-item-text">{this.props.value}</div>
            </li>
        );
    }
}

export default TodoList;