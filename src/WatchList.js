import React, { Component } from 'react';
import './WatchList.css';

class WatchList extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleCheck(e,id){
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.props.updateWatchListItemStatus(id,value);
    }

    handleComplete(e,id){
        this.props.updateWatchListItemStatus(id,1);
    }

    handleReset(e,id){
        this.props.updateWatchListItemStatus(id,0);
    }

    handleClose(e,id) {
        this.props.removeWatchListItem(id);
    }

    render() {
        const WatchList = this.props.WatchList;
        const listItems = [];
        const completedItems = [];

        WatchList.forEach((item) => {
            if(item.completed){
                completedItems.push(
                    <CompletedListItem 
                        key={item.id} 
                        id={item.id}
                        watchListItem={item.watchListItem}
                        handleClose={(e) => this.handleClose(e,item.id)} 
                        handleReset={(e) => this.handleReset(e,item.id)}
                    />
                );
            }else{
                listItems.push(
                    <WatchListItem 
                        key={item.id}
                        id={item.id} 
                        watchListItem={item.watchListItem}
                        handleClose={(e) => this.handleClose(e,item.id)} 
                        handleComplete={(e) => this.handleComplete(e,item.id)}
                    />
                );
            }
        });

        return (
            <div className="list-containers">
                { listItems.length === 0 ? (<h1 className="no-items">Add Movies or TV Shows to your Watch List</h1>) : null }
                <h3 className="WatchList-header-title">My Watch List</h3>
                    <div className="WatchList WatchList-container columns is-multiline is-mobile">{listItems}</div>
                <hr />
                <h3 className="WatchList-header-title CompletedList-header-title">Watched</h3>
                <div className="CompletedList WatchList WatchList-container columns is-multiline is-mobile">{completedItems}</div>
            </div>
        );
    }
}

class WatchListItem extends Component {

    render() {
        return (
            <div className="column WatchList-ListItem is-2-desktop is-4-tablet is-6-mobile">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-2by3">
                            { (this.props.watchListItem.Poster && this.props.watchListItem.Poster !== "N/A") ?
                            ( <img src={this.props.watchListItem.Poster} alt={this.props.watchListItem.Title} /> ) : 
                            ( <img src="/default_poster.png" alt={this.props.watchListItem.Title} /> ) }
                            <div className="ListItem-overlay">
                                <p className="ListItem-title">{this.props.watchListItem.Title}</p>
                                <div className="ListItem-subcontent">
                                    <span className="ListItem-year">{this.props.watchListItem.Year}</span>
                                </div>
                            </div>
                        </figure>
                    </div>
                    <footer className="card-footer">
                        <div className="card-footer-button WatchList-Check" onClick={this.props.handleComplete} title="Mark as Watched">
                            <span className="icon is-small card-footer-button-icon"><i className="fas fa-check"></i></span>
                            <span className="card-footer-button-text">Watched</span>
                        </div>
                        <div className="card-footer-button WatchList-Remove" onClick={this.props.handleClose} title="Remove from Watch List">
                            <span className="icon is-small"><i className="fas fa-times-circle"></i></span>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

class CompletedListItem extends Component {
    render(){
        return (
            <div className="column WatchList-ListItem is-2-desktop is-3-tablet is-4-mobile">
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-2by3">
                            { (this.props.watchListItem.Poster && this.props.watchListItem.Poster !== "N/A") ?
                            ( <img src={this.props.watchListItem.Poster} alt={this.props.watchListItem.Title} /> ) : 
                            ( <img src="/default_poster.png" alt={this.props.watchListItem.Title} /> ) }
                            <div className="ListItem-overlay">
                                <p className="ListItem-title">{this.props.watchListItem.Title}</p>
                                <div className="ListItem-subcontent">
                                    <span className="ListItem-year">{this.props.watchListItem.Year}</span>
                                </div>
                            </div>
                        </figure>
                    </div>
                    <footer className="card-footer">
                        <div className="card-footer-button WatchList-Reset" onClick={this.props.handleReset} title="Return to Watch List">
                            <span className="icon is-small card-footer-button-icon"><i className="fas fa-undo"></i></span>
                            <span className="card-footer-button-text">Return</span>
                        </div>
                        <div className="card-footer-button WatchList-Remove" onClick={this.props.handleClose} title="Remove from Watch List">
                            <span className="icon is-small"><i className="fas fa-times-circle"></i></span>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default WatchList;