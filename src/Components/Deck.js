import React from 'react';
import '../App.css';

class Deck extends React.Component {
  render() {
    if (this.props.cardsLeftInDeck > 0){
      return (
        <div className='playing_space'>
          <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
          <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
          <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
          <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
          <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
        </div>
      )
    }else {
      return (
        <div></div>
      )
    }
  }
}

export default Deck;
