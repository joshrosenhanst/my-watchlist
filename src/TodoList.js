import React, { Component } from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e,id) {
        this.props.removeTodoItem(id);
    }

    render() {
        const todoList = this.props.todoList;
        const listItems = todoList.map((item) => 
          <ListItem 
            key={item.id} 
            value={item.text} 
            id={item.id} 
            handleClose={(e) => this.handleClose(e,item.id)} 
            />
        );
        return (
          <ul className="TodoList">{listItems}</ul>
        );
    }
}

class ListItem extends React.Component {

    render() {
        return (
            <li>
                {this.props.value}
                <button className="remove-todo-item" onClick={this.props.handleClose}>X</button>
            </li>
        );
    }
}

export default TodoList;