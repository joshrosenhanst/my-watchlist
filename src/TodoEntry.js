import React, { Component } from 'react';

class TodoEntry extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleKeyPress(event){
        if(event.key == 'Enter' && event.target.value){
            this.props.addTodoItem(event.target.value);
            event.target.value = "";
        }
    }

    render() {
        return (
            <div className="Todo-entry">
                <div className="control has-icons-left">
                    <input type="text"  className="input" placeholder="Add a todo item" 
                        onKeyPress={this.handleKeyPress}
                    />
                    <span className="icon is-left">
                        <i className="fas fa-plus"></i>
                    </span>
                </div>
            </div>
        );
    }
}

export default TodoEntry;