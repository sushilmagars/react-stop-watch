import React from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayTime from './DisplayTime';
import Counter from './Counter';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <DisplayTime />
      </div>
    );
  }
}

export default App;
