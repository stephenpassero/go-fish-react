import React from 'react';
import './App.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      player_turn: 0,
      player_cards: []
    }
  }

  componentDidMount(){
    fetch('/game', {
      method: 'GET'
    }).then(data => data.json()).then((data) => {
      this.setState({names: data['names']})
       this.setState({player_turn: data['player_turn']})
       this.setState({player_cards: data['player_cards']})
    })
  }

  render() {
    if(this.state.names.length > 0){
      const robotPlayers = this.state.names.slice(0)
      const humanPlayer = this.state.names[0]
      robotPlayers.splice(0, 1)
      return (
        <div>
          <div className='holder'>
            {robotPlayers.map(
              function(name) {
                return (
                  <div className="player_div">
                    <h2>{name}</h2>
                    <img src="cards/backs_red.png" alt='Red Card Back'/>
                    <br/>
                    <img className='set_card' src="cards/s7.png" alt='card'/>
                    <img className='set_card' src="cards/sk.png" alt='card'/>
                  </div>
                )
              })
            }
          </div>
          <div className='playing_space'>
            <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
            <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
            <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
            <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
            <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
          </div>
          <h1>{humanPlayer}</h1>
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
