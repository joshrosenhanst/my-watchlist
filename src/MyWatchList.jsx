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
    this.storageError = false;
    this.state = {
      watchListArray: this.getWatchListStorage(),
      nextID: this.getNextIDStorage(),
    };
  }
  
  getWatchListStorage() {
    try {
      return JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_LIST)) || [];
    }
    catch (e){
      this.storageError = true;
      return [];
    }
  }

  getNextIDStorage() {
    try{
      return parseInt(localStorage.getItem(process.env.REACT_APP_STORAGE_NEXTID),10) || 0;
    }
    catch (e){
      this.storageError = true;
      return [];
    }
  }

  updateStorage(watchList,nextID){
    try {
      localStorage.setItem(process.env.REACT_APP_STORAGE_LIST, JSON.stringify(watchList));
      localStorage.setItem(process.env.REACT_APP_STORAGE_NEXTID, nextID);
    } catch (e) {
      this.storageError = true;
    }
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
          <h1 className="MyWatchList-title">
            <svg className="MyWatchList-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.9 270">
              <path d="M0,0.6C11.2,3,21.1,5.3,31.1,7.4c3.2,0.7,3.7,2.8,4.1,5.5
                c1.4,9.3,2.9,18.6,4.5,28.7c9.2,1.1,18.2,2.1,28.2,3.2c-1-11-1.9-21.1-2.9-32.1c22.4,2.9,44.1,3.4,66.6,3.2
                c-1.7,47.4-1.7,94.1-1.5,141.8c30.9-0.4,61.4,0.7,92.8,2.2c1.3,36.7,8,72.4,15,108c-2.4,2-4.5,0.9-6.7,0.4
                c-7.1-1.7-14.2-3.3-21.4-4.6c-3.7-0.7-5.3-2.3-5.8-6.1c-1.2-9.3-2.9-18.6-4.4-28.5c-9.1-1.1-18-2.1-28-3.2c1,10.9,2,21,3,32
                c-36.7-4.1-72.8-4.2-109.6,0c1-10.7,1.9-20.8,2.9-32C58,226.9,49,228,39.7,229c-1.5,9.6-3.2,18.4-4.1,27.3
                c-0.5,4.9-2.8,6.7-7.4,7.5c-9,1.6-17.9,3.9-28.2,6.1C22.5,180,22.5,90.6,0,0.6z M42.8,199.5c9.5-0.7,17.9-1.4,27-2.1
                c0.5-8.8,0.9-16.9,1.4-25.9c-9.4,0.6-17.8,1.1-26.6,1.6C44.1,182,43.5,190.3,42.8,199.5z M69.9,73.1c-9.3-0.7-17.9-1.3-27-1.9
                c0.7,9.2,1.2,17.4,1.9,26.3c8.7,0.5,17.2,1,26.5,1.5C70.8,90.1,70.3,82,69.9,73.1z M169.4,197.5c9.3,0.7,17.9,1.3,27.1,1.9
                c-0.7-9.4-1.3-17.7-2-26.1c-9-0.7-17.4-2-26.5-1.2C168.5,180.9,169,188.9,169.4,197.5z M46,147c8.6,0,16.9,0,25.1,0
                c0-8.2,0-15.7,0-23.7c-8.6,0-16.6,0-25.1,0C46,131.4,46,139.2,46,147z"/>
            </svg>
            <span>My WatchList</span>
          </h1>
          <WatchListInput 
            addWatchListItem={(watchListItem) => this.addWatchListItem(watchListItem)} 
          />
          {this.storageError && <div id="storageError"><strong>Unable to access LocalStorage: </strong>Your watchlist for this session will not be saved when you leave the page.<br />Please enable cookies and/or site data for this website in your browser settings. For Internet Explorer, you may need to disable Protected Mode. Refresh the page when cookies/site data are enabled..</div>}
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
