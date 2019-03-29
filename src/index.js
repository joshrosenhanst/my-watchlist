import 'react-app-polyfill/ie9';
import 'core-js/features/map';
import 'core-js/features/set';

import React from 'react';
import ReactDOM from 'react-dom';
import MyWatchList from './MyWatchList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MyWatchList />,
    document.getElementById('root')
);

registerServiceWorker();
