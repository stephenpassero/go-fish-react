import React from 'react';
import '../App.css';

class HumanPlayer extends React.Component {

  render() {
    const cards = this.props.cards
    if(this.props.playerTurn === 1 && Array.isArray(cards)){// Checks if cards is actually an array and if it is your turn
      return (
        <div className='human_player'>
          <h3>{`It's your turn!`}</h3>
          <h2>{this.props.name}</h2>
          {cards.map((card, index) => {
              return (
                <img key={`img${index + 1}`} src={`cards/${card}.png`} alt="Card in your hand"/>
              )
            })
          }
        </div>
      )
    }else if(Array.isArray(cards)){
      return (
        <div className='human_player'>
          <h2>{this.props.name}</h2>
          {cards.map((card, index) => {
              return (
                <img key={`img${index + 1}`} src={`cards/${card}.png`} alt="Card in your hand"/>
              )
            })
          }
          <br/>
          {this.props.books.map((card, index) => {
            return <img key={`img${index + 1}`} src={`cards/${card}.png`} alt="One of your books"/>
          })
          }
        </div>
      )
    }else{
      return (
        <div></div>
      )
    }
  }
}

export default HumanPlayer;
