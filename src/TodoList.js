import React, { Component } from 'react';

class TodoList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const listItems = todoList.map((item) => 
          <ListItem key={item.id} value={item.text} />
        );
        return (
          <ul className="TodoList">{listItems}</ul>
        );
    }
}

class ListItem extends React.Component {
    render() {
        return <li>{this.props.value}</li>;
    }
}

export default TodoList;