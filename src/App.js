import React, { Component } from 'react';
import './App.css';
import Join from './Join.js'

class App extends Component {
  render() {
    return (
      // When state switches render Game instead of Join
      <div>
        // <Join updateState={(str) => this.updateState.bind(this)}/>
      </div>
    );
  }
}

export default App;
