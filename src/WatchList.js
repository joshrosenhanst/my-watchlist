import React, { Component } from 'react';
import './WatchList.css';

class WatchList extends React.Component {
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
                { listItems.length == 0 ? (<h1 className="no-items">Add Movies or TV Shows to your Watch List</h1>) : null }
                    <ul className="WatchList WatchList-element">{listItems}</ul>
                <hr />
                <ul className="CompletedList WatchList-element">{completedItems}</ul>
            </div>
        );
    }
}

class WatchListItem extends React.Component {

    render() {
        return (
            <li className="notification">
                <button className="delete WatchList-Remove" onClick={this.props.handleClose}></button>
                <article className="media">
                    <figure className="media-left">
                        <p className="image">
                            <img src={this.props.watchListItem.image} alt={this.props.watchListItem.title} />
                        </p>
                    </figure>
                    <div className="media-content">
                        <h3 className="ListItem-title">
                            {this.props.watchListItem.title}
                            <span className="ListItem-year">{this.props.watchListItem.year}</span>
                        </h3>
                        <p className="ListItem-description">{this.props.watchListItem.description}</p>
                        <p className="buttons">
                            <button className="button WatchList-Complete is-success" onClick={this.props.handleComplete}>
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
                <button className="delete WatchList-Remove" onClick={this.props.handleClose}></button>
                <article className="CompletedListItem-content">
                    <h3 className="ListItem-title">
                        {this.props.watchListItem.title}
                    </h3>
                    <p className="buttons">
                        <button className="button WatchList-Reset" onClick={this.props.handleReset}>
                            <span className="icon"><i className="fa fa-undo"></i></span>
                            <span>Return to Watch List</span>
                        </button>
                    </p>
                </article>
            </li>
        );
    }
}

export default WatchList;