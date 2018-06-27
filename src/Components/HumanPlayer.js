import React from 'react';
import '../App.css';

class HumanPlayer extends React.Component {

  render() {
    const cards = this.props.cards
    if(this.props.yourTurn === true && Array.isArray(cards)){ //Checks if cards is actually an array
      return (
        <div className='human_player'>
          <h1>{this.props.name}</h1>
          {cards.map((card, index) => {
              return (
                <img key={`img${index + 1}`} src="cards/d7.png" alt="Card in your hand"/>
              )
            })
          }
        </div>
      )
    }else if(Array.isArray(cards)){
      return (
        <div className='human_player'>
          <h1>{this.props.name}</h1>
          {cards.map((card, index) => {
              return (
                <img key={`img${index + 1}`} src="cards/d7.png" alt="Card in your hand"/>
              )
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
