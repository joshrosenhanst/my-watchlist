import React, { Component } from 'react';

class TodoEntry extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleKeyPress(event){
        if(event.key == 'Enter'){
            this.props.addTodoItem(event.target.value);
            event.target.value = "";
        }
    }

    render() {
        return (
            <div className="Todo-entry">
                <input type="text" placeholder="Add a todo item" 
                    onKeyPress={this.handleKeyPress}
                />
            </div>
        );
    }
}

export default TodoEntry;