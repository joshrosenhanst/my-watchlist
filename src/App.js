import React, { Component } from 'react';
//import update from 'immutability-helper';
//import { DragDropContext } from 'react-dnd';
//import HTML5Backend from 'react-dnd-html5-backend';
import WatchListInput from './WatchListInput';
import WatchList from './WatchList';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      WatchList: this.getWatchListStorage(),
      nextID: this.getNextIDStorage(),
    };
  }

  getWatchListStorage() {
    let storage = localStorage.getItem("todo-app-watchlist");
    return JSON.parse(storage) || [];
  }

  getNextIDStorage() {
    return parseInt(localStorage.getItem("todo-app-nextid"),2) || 0;
  }

  updateStorage(watchList,nextID){
    localStorage.setItem("todo-app-watchlist", JSON.stringify(watchList));
    localStorage.setItem("todo-app-nextid", nextID);
  }

  checkDuplicateIMDBID(id){
    let matches = this.state.WatchList.filter((item) => item.watchListItem.imdbID === id);
    return matches.length;
  }

  addWatchListItem(watchListItem) {
    let updatedID = parseInt(this.state.nextID,2) + 1;
    if(!this.checkDuplicateIMDBID(watchListItem.imdbID)){
      let updatedList = this.state.WatchList.concat([{
        id:updatedID, 
        watchListItem:watchListItem
      }]);
      this.setState({
        WatchList: updatedList,
        nextID: updatedID
      });
      this.updateStorage(updatedList, updatedID);
    }
  }

  removeWatchListItem(id) {
    let updatedList = this.state.WatchList.filter((item) => item.id !== id);
    this.setState({
      WatchList: updatedList
    });
    this.updateStorage(updatedList, this.state.nextID);
  }

  updateWatchListItemStatus(id,status){
    //clone the array and then map the cloned array to set completed on the matching ID
    const WatchList = this.state.WatchList.slice(0);
    let updatedList = WatchList.map((item) => item.id !== id ? item : {...item, completed:status});
    this.setState({
      WatchList: updatedList
    });
    this.updateStorage(updatedList, this.state.nextID);
  }

  render() {
    const watchList = this.state.WatchList;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Watch List Tracker</h1>
          <h2 className="App-subtitle subtitle">Search to add Movies or TV Shows to your Watch List</h2>
          <WatchListInput 
            addWatchListItem={(watchListItem) => this.addWatchListItem(watchListItem)} 
          />
        </header>
        <main className="App-main">
          <WatchList 
            WatchList={watchList}
            removeWatchListItem={(id) => this.removeWatchListItem(id)}
            updateWatchListItemStatus={(id, status) => this.updateWatchListItemStatus(id, status)}
          />
        </main>
      </div>
    );
  }
}

export default App;
