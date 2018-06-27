import React from 'react';
import '../App.css';

class Deck extends React.Component {
  render() {
    return (
      <div className='playing_space'>
        <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
        <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
        <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
        <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
        <img className="deck_card" src='cards/backs_red.png' alt="Red Card Back"/>
      </div>
    )
  }
}

export default Deck;
