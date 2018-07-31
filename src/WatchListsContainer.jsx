import React, { Component } from 'react';
import './WatchListsContainer.css';
import WatchListItem from './WatchListItem';

class WatchListsContainer extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleReset = this.handleReset.bind(this);
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

    getLists() {
        const listItems = this.props.listItems;
        const upNextItems = [];
        const completedItems = [];

        listItems.forEach((item) => {
            let listItem = (
                <WatchListItem 
                    key={item.id}
                    completed={item.completed}
                    watchListItem={item.watchListItem}
                    handleClose={(e) => this.handleClose(e,item.id)} 
                    handleReset={(e) => this.handleReset(e,item.id)}
                    handleComplete={(e) => this.handleComplete(e,item.id)}
                />
            )
            if(item.completed){
                completedItems.push(listItem);
            }else{
                upNextItems.push(listItem);
            }
        });

        return [upNextItems,completedItems];
    }

    render() {
        const [upNextItems, completedItems] = this.getLists();

        return (
            <div className="list-containers">
                <h3 className="WatchList-header-title">Up Next</h3>
                <div className="WatchList WatchList-container columns is-multiline is-mobile is-centered">{upNextItems}</div>

                { upNextItems.length === 0 && (
                <div className="empty-WatchList">
                    <div className="notification">Add Movies or TV Shows to your WatchList</div>
                </div>
                ) }
                { completedItems.length > 0 && (
                    <div className="CompletedList-container">
                        <h3 className="WatchList-header-title CompletedList-header-title">Watched</h3>
                        <div className="CompletedList WatchList WatchList-container columns is-multiline is-mobile  is-centered">{completedItems}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default WatchListsContainer;