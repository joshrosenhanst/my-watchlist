import React, { Component } from 'react';
//import update from 'immutability-helper';
//import { DragDropContext } from 'react-dnd';
//import HTML5Backend from 'react-dnd-html5-backend';
import WatchListInput from './WatchListInput';
import WatchListsContainer from './WatchListsContainer';
import './MyWatchList.css';

class MyWatchList extends Component {
  constructor(props){
    super(props);
    this.state = {
      watchListArray: this.getWatchListStorage(),
      nextID: this.getNextIDStorage(),
    };
  }

  getWatchListStorage() {
    let storage = localStorage.getItem(process.env.REACT_APP_STORAGE_LIST);
    return JSON.parse(storage) || [];
  }

  getNextIDStorage() {
    return parseInt(localStorage.getItem(process.env.REACT_APP_STORAGE_NEXTID),10) || 0;
  }

  updateStorage(watchList,nextID){
    localStorage.setItem(process.env.REACT_APP_STORAGE_LIST, JSON.stringify(watchList));
    localStorage.setItem(process.env.REACT_APP_STORAGE_NEXTID, nextID);
  }

  checkDuplicateIMDBID(id){
    let matches = this.state.watchListArray.filter((item) => item.watchListItem.imdbID === id);
    return matches.length;
  }

  addWatchListItem(watchListItem) {
    let updatedID = parseInt(this.state.nextID,10) + 1;
    if(!this.checkDuplicateIMDBID(watchListItem.imdbID)){
      let newItem = [{
        id:updatedID, 
        watchListItem:watchListItem
      }];
      let updatedList = newItem.concat(this.state.watchListArray);
      this.setState({
        watchListArray: updatedList,
        nextID: updatedID
      });
      this.updateStorage(updatedList, updatedID);
    }
  }

  removeWatchListItem(id) {
    let updatedList = this.state.watchListArray.filter((item) => item.id !== id);
    this.setState({
      watchListArray: updatedList
    });
    this.updateStorage(updatedList, this.state.nextID);
  }

  updateWatchListItemStatus(id,status){
    //clone the array and then map the cloned array to set completed on the matching ID
    const watchListArray = this.state.watchListArray.slice(0);
    let updatedList = watchListArray.map((item) => item.id !== id ? item : {...item, completed:status});
    this.setState({
      watchListArray: updatedList
    });
    this.updateStorage(updatedList, this.state.nextID);
  }

  render() {
    const watchListArray = this.state.watchListArray;
    return (
      <div className="MyWatchList">
        <header className="MyWatchList-header">
          <h1 className="MyWatchList-title">My WatchList</h1>
          <h2 className="MyWatchList-subtitle subtitle" id="MyWatchList-subtitle">Search to add Movies or TV Shows to your WatchList</h2>
          <WatchListInput 
            addWatchListItem={(watchListItem) => this.addWatchListItem(watchListItem)} 
          />
        </header>
        <main className="MyWatchList-main">
          <WatchListsContainer
            listItems={watchListArray}
            removeWatchListItem={(id) => this.removeWatchListItem(id)}
            updateWatchListItemStatus={(id, status) => this.updateWatchListItemStatus(id, status)}
          />
        </main>
        <footer className="MyWatchList-footer">
            <p>Your WatchList is stored locally in your browser using HTML5 LocalStorage. Movie information and posters provided by <a href="https://www.omdbapi.com/">OMDB</a>.</p>
        </footer>
      </div>
    );
  }
}

export default MyWatchList;
