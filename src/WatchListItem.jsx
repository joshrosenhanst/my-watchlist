import React, { Component } from 'react';
import './WatchListItem.css';
import default_poster from './img/default_poster.png';

class WatchListItem extends Component {
    render() {
        return (
            <div tabindex="0" className={"column WatchList-ListItem "+(this.props.completed?"completed-item is-2-desktop is-3-tablet is-4-mobile":"up-next-item is-2-desktop is-4-tablet is-6-mobile")} aria-label={this.props.watchListItem.Title+" "+this.props.watchListItem.Year+" "+this.props.watchListItem.Type}>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-2by3">
                            { (this.props.watchListItem.Poster && this.props.watchListItem.Poster !== "N/A") ?
                            ( <img src={this.props.watchListItem.Poster} alt={this.props.watchListItem.Title + " Poster"} /> ) : 
                            ( <img src={default_poster} alt={this.props.watchListItem.Title+" Poster"} /> ) }
                            <div className="ListItem-overlay">
                                <p className="ListItem-title">{this.props.watchListItem.Title}</p>
                                <div className="ListItem-subcontent">
                                    <span className="ListItem-year">{this.props.watchListItem.Year}</span> <span className="ListItem-movie">{this.props.watchListItem.Type}</span>
                                </div>
                            </div>
                        </figure>
                    </div>
                    <footer className="card-footer">
                        { this.props.completed ? (
                            <button className="card-footer-button WatchList-Reset" onClick={this.props.handleReset} title="Return to Watch List">
                                <span className="icon is-small card-footer-button-icon"><i className="fas fa-undo"></i></span>
                                <span className="card-footer-button-text">Return</span>
                            </button>
                        ) :
                        (
                            <button className="card-footer-button WatchList-Check" onClick={this.props.handleComplete} title="Mark as Watched">
                                <span className="icon is-small card-footer-button-icon"><i className="fas fa-check"></i></span>
                                <span className="card-footer-button-text">Watched</span>
                            </button>
                        )}
                        
                        <button className="card-footer-button WatchList-Remove" onClick={this.props.handleClose} title="Remove from Watch List">
                            <span className="icon is-small"><i className="fas fa-times-circle"></i></span>
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
}

export default WatchListItem;