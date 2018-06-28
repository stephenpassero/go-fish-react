import React from 'react';
import '../App.css';

class EndGame extends React.Component {
  render() {
    const winners = this.props.winners;
    let winnerStr = ''
    if(winners.length == 1){
      return (
        <div>
          <h1>Game Over...</h1>
          <h2>{`${winners[0].name} won!`}</h2>
        </div>
      )
    }else{
      return (
        <div>
          <h1>Game Over...</h1>
          {winners.map((player, index) => {
            // Formats the winner string like this: "Player1, Player2, and Player3 tied..."
            if(index == winners.length - 2){
              winnerStr += `${player.name} and`
            }else if(index == winners.length - 1){
              winnerStr += `${player.name} tied...`
            }else{
              winnerStr += `${player.name}`
            }
          })}
        </div>
      )
    }
  }
}

export default EndGame;
