import React from 'react';
import ReactDOM from 'react-dom';
import MyWatchList from './MyWatchList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyWatchList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
