import React from 'react';
import '../App.css';

class EndGame extends React.Component {
  constructor() {
    super();
    this.state = {
      winners: []
    }
  }

  componentDidMount(){
    fetch('/end_game', { method: 'GET'})
    .then(data => data.json())
    .then((data) => {
      // Data is an obj with the score as the key and the player name as the value
      let topPlayers = [];
      let highestScore = 0;
      Object.keys(data).map((score) => {
        if(score > highestScore){
          topPlayers.length = 0;
          topPlayers.push(data[score])
          highestScore = score
        }else if(score === highestScore){
          topPlayers.push(data[score])
        }
      })
      console.log(topPlayers)
      this.setState({winners: topPlayers})
    })
  }

  render() {
    const winners = this.state.winners;
    console.log(winners)
    let winnerStr = ''
    if(winners.length === 1){
      return (
        <div className='wrapper'>
          <h1>Game Over!</h1>
          <h2>{`${winners[0]} won!`}</h2>
        </div>
      )
    }else{
      return (
        <div className='wrapper'>
          <h1>Game Over!</h1>
          {winners.map((player, index) => {
            // Formats the winner string like this: "Player1, Player2, and Player3 tied..."
            if(index === winners.length - 2){
              winnerStr += `${player} and`
            }else if(index === winners.length - 1){
              winnerStr += `${player} tied...`
            }else{
              winnerStr += `${player} `
            }
          })}
          <h3>{winnerStr}</h3>
        </div>
      )
    }
  }
}

export default EndGame;
