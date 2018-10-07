import 'react-app-polyfill/ie9';
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import { render } from 'react-snapshot';
import MyWatchList from './MyWatchList';
import registerServiceWorker from './registerServiceWorker';

render(
    <MyWatchList />,
    document.getElementById('root')
);

registerServiceWorker();
