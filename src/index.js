import 'react-app-polyfill/ie9';
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';
import MyWatchList from './MyWatchList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MyWatchList />,
    document.getElementById('root')
);

registerServiceWorker();
