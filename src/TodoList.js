import React, { Component } from 'react';
import './TodoList.css';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleCheck(e,id){
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.props.checkTodoItem(id,value);
    }

    handleComplete(e,id){
        this.props.checkTodoItem(id,1);
    }

    handleReset(e,id){
        this.props.checkTodoItem(id,0);
    }

    handleClose(e,id) {
        this.props.removeTodoItem(id);
    }

    render() {
        const todoList = this.props.todoList;
        const listItems = [];
        const completedItems = [];

        todoList.forEach((item) => {
            if(item.completed){
                completedItems.push(
                    <CompletedListItem 
                        key={item.id} 
                        id={item.id}
                        watchItem={item.watchItem}
                        handleClose={(e) => this.handleClose(e,item.id)} 
                        handleCheck={(e) => this.handleCheck(e,item.id)} 
                        handleComplete={(e) => this.handleComplete(e,item.id)}
                        handleReset={(e) => this.handleReset(e,item.id)}
                        checked={item.completed}
                    />
                );
            }else{
                listItems.push(
                    <ListItem 
                        key={item.id}
                        id={item.id} 
                        watchItem={item.watchItem}
                        handleClose={(e) => this.handleClose(e,item.id)} 
                        handleCheck={(e) => this.handleCheck(e,item.id)} 
                        handleComplete={(e) => this.handleComplete(e,item.id)}
                        handleReset={(e) => this.handleReset(e,item.id)}
                        checked={item.completed}
                    />
                );
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
                { listItems.length == 0 ? (<h1 className="no-items">Add Todo List Items</h1>) : null }
                    <ul className="TodoList TodoList-element">{listItems}</ul>
                <hr />
                <ul className="CompletedList TodoList-element">{completedItems}</ul>
            </div>
        );
    }
}

class ListItem extends React.Component {

    render() {
        return (
            <li className="notification">
                <button className="delete remove-todo-item" onClick={this.props.handleClose}></button>
                <article className="media">
                    <figure className="media-left">
                        <p className="image">
                            <img src="http://via.placeholder.com/120x150" alt="Placeholder"/>
                        </p>
                    </figure>
                    <div className="media-content">
                        <h3 className="ListItem-title">
                            {this.props.watchItem.title}
                            <span className="ListItem-year">{this.props.watchItem.year}</span>
                        </h3>
                        <p className="ListItem-description">{this.props.watchItem.description}</p>
                        <p className="buttons">
                            <button className="button TodoList-Complete is-success" onClick={this.props.handleComplete}>
                                <span className="icon"><i className="fa fa-check"></i></span>
                                <span>Watched</span>
                            </button>
                        </p>
                    </div>
                </article>
            </li>
        );
    }
}

class CompletedListItem extends React.Component {
    render(){
        return (
            <li className="notification">
                <button className="delete remove-todo-item" onClick={this.props.handleClose}></button>
                <article className="CompletedListItem-content">
                    <h3 className="ListItem-title">
                        {this.props.watchItem.title}
                    </h3>
                    <p className="buttons">
                        <button className="button TodoList-Reset" onClick={this.props.handleReset}>
                            <span className="icon"><i className="fa fa-undo"></i></span>
                            <span>Return to Watch List</span>
                        </button>
                    </p>
                </article>
            </li>
        );
    }
}

export default TodoList;