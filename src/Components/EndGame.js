import React from 'react';
import '../App.css';

class EndGame extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ''
    }
  }

  componentDidMount(){
    fetch('/end_game', { method: 'GET'})
    .then(data => data.json())
    .then((data) => {
      this.setState({result: data['result']})
    })
  }

  render() {
    return (
      <div className='wrapper'>
        <h1>Game Over!</h1>
        <h2>{this.state.result}</h2>
      </div>
    )
  }
}

export default EndGame;
