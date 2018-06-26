import React from 'react';
import './App.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: {
        hand: []
      },
      opponents: []
    }
  }

  // componentDidMount(){
  //   fetch('/game', {
  //     method: 'get'
  //   }).then(data => data.json()).then((data) => {
  //
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default Game;
