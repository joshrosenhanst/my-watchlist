import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './TodoEntry.css';

const movies = [
    {
        title: 'Jurassic Park',
        description: 'Lorem Ipsum dinosaurs',
        image: 'http://via.placeholder.com/40x54?text=Jurassic+Park',
        year: '1993',
        type: 'movie'
    },
    {
        title: 'The Wire',
        description: 'Lorem Ipsum baltimore',
        image: 'http://via.placeholder.com/40x54?text=The+Wire',
        year: '2000',
        type: 'TV Show'
    },
    {
        title: 'The Jalopy',
        description: 'Lorem Ipsum jalopy',
        image: 'http://via.placeholder.com/40x54?text=The+Jalopy',
        year: '1969',
        type: 'Movie'
    },
];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : movies.filter(mov =>
        mov.title.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = suggestion => (
    <div>
    <article className="media">
        <figure className="media-left Suggestion-image">
            <p className="image">
                <img src={suggestion.image} alt={suggestion.title} />
            </p>
        </figure>
        <div className="media-content">
            <h3 className="Suggestion-title">
                {suggestion.title}
                <span className="Suggestion-year">({suggestion.year})</span>
            </h3>
        </div>
    </article>
    </div>
  );

class TodoEntry extends React.Component {
    constructor(props) {
        super(props);
        //this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            value: '',
            suggestions: []
        };
    }
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.setState({
            suggestions: []
        });
        this.props.addTodoItem( suggestion.title );
    }
    /*onSuggestionSelected = value => {
        console.log(value);
        this.setState({
            suggestions: []
        });
        //this.props.addTodoItem( value );
    }*/
    /*handleKeyPress(event){
        if(event.key == 'Enter' && event.target.value){
            this.props.addTodoItem(event.target.value);
            event.target.value = "";
        }
    }*/

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Type a Movie or TV Show...',
            value,
            onChange: this.onChange,
            className: 'input'
        };
        return (
            <div className="Todo-entry">
                <div className="control has-icons-left">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        onSuggestionSelected={this.onSuggestionSelected}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
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