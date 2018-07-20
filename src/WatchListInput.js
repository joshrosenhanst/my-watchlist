import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';
import './WatchListInput.css';

const movies = [
    {
        title: 'Jurassic Park',
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

const getSuggestions = value => {
    const url = process.env.REACT_APP_OMDB_DATA_API_URL + "s=" + value;
    const suggestions = fetch(url).then(res => {
		return res.json();
    });
    console.log(suggestions);
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
                <img src={suggestion.thumbnail} alt={suggestion.title} />
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

class WatchListInput extends Component {
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

    /*onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };*/

    onSuggestionsFetchRequested = debounce(({ value }) => {
        let suggestions = getSuggestions(value);
        let noResults = suggestions.length === 0;
        this.setState({
            suggestions: suggestions,
            noResults: noResults
        });
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
            placeholder: 'Type a Movie or TV Show...',
            value,
            onChange: this.onChange,
            className: 'input'
        };
        console.log(noResults);
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