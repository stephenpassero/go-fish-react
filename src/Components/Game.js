import React from 'react';
import '../App.css';
import RobotPlayer from './RobotPlayer.js'
import Deck from './Deck.js'
import HumanPlayer from './HumanPlayer.js'
import GameLog from './GameLog.js'

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
      playerTarget: '',
      cardsLeftInDeck: '',
      responses: ''
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
       this.setState({cardsLeftInDeck: data['cards_left_in_deck']});
       this.setState({responses: data['responses']});
    })
  }

  updateGameState(){
    fetch('/game', {
      method: 'GET'
    }).then(data => data.json()).then((data) => {
      this.setState({names: data['names']})
       this.setState({playerTurn: data['player_turn']});
       this.setState({playerCards: data['player_cards']});
       this.setState({robotBooks: data['robot_books']});
       this.setState({playerBooks: data['player_books']});
       this.setState({cardsLeftInDeck: data['cards_left_in_deck']});
       this.setState({responses: data['responses']});
       this.setState({cardTarget: ''})
       this.setState({playerTarget: ''})
    })
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
                  <RobotPlayer playerTarget={this.state.playerTarget} playerTurn={this.state.playerTurn} playerClicked={this.playerClicked.bind(this)} robotBooks={this.state.robotBooks} key={`RobotPlayer${index + 1}`} name={name} index={index}/>
                )
              })
            }
          </div>
          <Deck cardsLeftInDeck={this.state.cardsLeftInDeck}/>
          <HumanPlayer playerTarget={this.state.playerTarget}
                        cardTarget={this.state.cardTarget}
                        cardClicked={this.cardClicked.bind(this)}
                        name={humanPlayerName}
                        books={this.state.playerBooks}
                        playerTurn={this.state.playerTurn}
                        cards={this.state.playerCards}
                        updateState={this.props.updateState.bind(this)}
                        updateGameState={this.updateGameState.bind(this)}
          />
          <GameLog responses={this.state.responses}/>
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
