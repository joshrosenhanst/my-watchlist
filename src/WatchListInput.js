import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';
import './WatchListInput.css';

const movies = [
    {
        Title: 'Jurassic Park',
        Type: 'movie',
        Poster:'https://m.media-amazon.com/images/M/MV5BNjc1NzYwODEyMV5BMl5BanBnXkFtZTcwNTcxMzU1MQ@@._V1_SX300.jpg',
        Year:'2002-2008',
        imdbID:'tt0306414',
        description: 'Lorem Ipsum dinosaurs',
        thumbnail: 'http://via.placeholder.com/40x54?text=Jurassic+Park',
        image: 'http://via.placeholder.com/120x150?text=Jurassic+Park',
        year: '1993',
        type: 'movie'
    },
    {
        title: 'The Wire',
        description: 'Lorem Ipsum baltimore',
        thumbnail: 'http://via.placeholder.com/40x54?text=The+Wire',
        image: 'http://via.placeholder.com/120x150?text=The+Wire',
        year: '2000',
        type: 'TV Show'
    },
    {
        title: 'The Jalopy',
        description: 'Lorem Ipsum jalopy',
        thumbnail: 'http://via.placeholder.com/40x54?text=The+Wire',
        image: 'http://via.placeholder.com/120x150?text=The+Jalopy',
        year: '1969',
        type: 'Movie'
    },
];

const getSuggestionValue = suggestion => suggestion.Title;

const renderSuggestion = suggestion => (
    <div>
    <article className="Suggestion-container">
        <h3 className="Suggestion-title">
            {suggestion.Title}
            <span className="Suggestion-year">({suggestion.Year})</span>
        </h3>
    </article>
    </div>
  );

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
        const escapedValue = encodeURIComponent(value);
        const url = process.env.REACT_APP_OMDB_DATA_API_URL + "s=" + escapedValue;
        let suggestions = [];
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