import 'react-app-polyfill/ie9';
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import { hydrate, render } from 'react-dom';
import MyWatchList from './MyWatchList';
import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<MyWatchList />, rootElement);
} else {
    render(<MyWatchList />, rootElement);
}

registerServiceWorker();
