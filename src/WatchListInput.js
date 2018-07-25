import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';
import './WatchListInput.css';

const getSuggestionValue = suggestion => suggestion.Title;

const getIconType = type => {
    switch(type){
        case 'series':
            return 'fa fa-tv';
        case 'movie':
            return 'fa fa-film';
        case 'game':
            return 'fa fa-gamepad';
        default:
            return 'fa fa-play';
    }
};

const renderSuggestion = suggestion => {
    let iconType = getIconType(suggestion.Type);
    return (
    <div>
    <article className="Suggestion-container">
        <h3 className="Suggestion-title">
            <span className="Suggestion-icon"><i className={iconType}></i></span>
            {suggestion.Title}
            <span className="Suggestion-year">({suggestion.Year})</span>
        </h3>
    </article>
    </div>
    );
};

class WatchListInput extends Component {
    constructor(props) {
        super(props);
        //this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            value: '',
            suggestions: []
        };
    }

    getSuggestions = value => {
        const escapedValue = encodeURIComponent(value.trim());
        const url = process.env.REACT_APP_OMDB_DATA_API_URL + "s=" + escapedValue;
        let suggestions = [];
        if(value.trim().length > 2){
            fetch(url)
                .then(res => res.json())
                .then(
                    (results) => {
                        if(results.Search){
                            suggestions = results.Search;
                            this.setState({
                                suggestions: suggestions,
                                noResults: suggestions.length === 0
                            });
                        }else{
                            this.setState({
                                suggestions: [],
                                noResults: true
                            });
                        }
                    },
                    (error) => {
                        console.log(error.Error);
                        this.setState({
                            suggestions: [],
                            noResults: false
                        });
                    }
                );
        }
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = debounce(({ value }) => {
        this.getSuggestions(value);
    }, 500);

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
            noResults: false
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        this.setState({
            suggestions: [],
            value: '',
            noResults: false
        });
        this.props.addWatchListItem( suggestion );
    }

    render() {
        const { value, suggestions, noResults } = this.state;
        const inputProps = {
            placeholder: 'Search for a movie or TV show...',
            value,
            onChange: this.onChange,
            className: 'input'
        };
        //console.log(noResults);
        if(process.env.REACT_APP_OMDB_API_KEY){
            return (
                <div className="WatchListInput">
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
                        {
                            noResults ? (<div className="no-suggestions">No Results</div>) : null
                        }
                        <span className="icon is-left">
                            <i className="fas fa-plus"></i>
                        </span>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="notification is-danger">
                    <i className="fas fa-exclamation-triangle"></i> Unable to connect to OMDB API
                </div>
            );
        }
        
    }
}

export default WatchListInput;