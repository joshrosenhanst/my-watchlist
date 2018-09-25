import React from 'react';
import ReactDOM from 'react-dom';
import MyWatchList from './MyWatchList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyWatchList />, document.getElementById('root'));
registerServiceWorker();
