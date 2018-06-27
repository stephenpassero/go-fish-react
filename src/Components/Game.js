import React from 'react';
import '../App.css';
import RobotPlayer from './RobotPlayer.js'
import Deck from './Deck.js'
import HumanPlayer from './HumanPlayer.js'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: '',
      playerTurn: 0,
      playerCards: ''
    }
  }

  componentDidMount(){
    fetch('/game', {
      method: 'GET'
    }).then(data => data.json()).then((data) => {
      this.setState({names: data['names']})
       this.setState({playerTurn: data['player_turn']})
       this.setState({playerCards: data['player_cards']})
    })
  }

  render() {
    if(this.state.names.length > 0){
      const robotPlayerNames = this.state.names.slice(0)
      const humanPlayerName = this.state.names[0]
      robotPlayerNames.splice(0, 1)
      return (
        <div>
          <div className='holder'>
            {robotPlayerNames.map(
              function(name, index) {
                return (
                  <RobotPlayer key={`RobotPlayer${index + 1}`} name={name} index={index}/>
                )
              })
            }
          </div>
          <Deck/>
          <HumanPlayer name={humanPlayerName} yourTurn={false} cards={this.state.playerCards}/>
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
