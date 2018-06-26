import React from 'react';
import './App.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: ""
    }
  }

  componentDidMount(){
    fetch('/game', {
      method: 'GET'
    }).then(data => data.json()).then((data) => {
      this.setState({players: data['players']})
    })
  }

  render() {
    if(this.state.players.length > 0){
      return (
        <div>
          <h1>{this.state.players[0]}</h1>
        </div>
      );
    }else {
      return (
        <div>
        </div>
      );
    }
  }
}

export default Game;
