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
      playerCards: [],
      robotBooks: [],
      playerBooks: [],
      cardTarget: '',
      playerTarget: ''
    }
  }

  componentDidMount(){
    fetch('/game', {
      method: 'GET'
    }).then(data => data.json()).then((data) => {
      this.setState({names: data['names']})
       this.setState({playerTurn: data['player_turn']});
       this.setState({playerCards: data['player_cards']});
       this.setState({robotBooks: data['robot_books']});
       this.setState({playerBooks: data['player_books']});
    })
  }

  clearData(){
    this.setState({cardTarget: ''})
    this.setState({playerTarget: ''})
  }

  cardClicked(card_rank){
    this.setState({cardTarget: card_rank})
  }

  playerClicked(player){
    this.setState({playerTarget: player})
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
              (name, index) => {
                return (
                  <RobotPlayer playerTurn={this.state.playerTurn} playerClicked={this.playerClicked.bind(this)} robotBooks={this.state.robotBooks} key={`RobotPlayer${index + 1}`} name={name} index={index}/>
                )
              })
            }
          </div>
          <Deck/>
          {/* Pass in the card clicked rank through params and change the class depending on the*/ }
          <HumanPlayer cardTarget={this.state.cardTarget} clearData={this.clearData.bind(this)} cardClicked={this.cardClicked.bind(this)} name={humanPlayerName} books={this.state.playerBooks} playerTurn={this.state.playerTurn} cards={this.state.playerCards}/>
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
