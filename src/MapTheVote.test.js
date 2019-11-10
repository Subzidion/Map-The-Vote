import React from 'react';
import ReactDOM from 'react-dom';
import MapTheVote from './MapTheVote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapTheVote />, div);
  ReactDOM.unmountComponentAtNode(div);
});
