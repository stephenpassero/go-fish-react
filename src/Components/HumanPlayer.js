import React from 'react';
import '../App.css';

class HumanPlayer extends React.Component {

  getRank(card){
    let new_card = card.slice(1);
    if (new_card === "1"){
      new_card += '0';
    }
    return new_card;
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('/request_card', {
      method: 'POST',
      body: JSON.stringify({
        card_rank: this.props.cardTarget,
        player: this.props.playerTarget
      })
    }).then(data => data.json()).then(data => {
      this.props.updateState(data['page']);
      this.props.updateGameState();
    })
  }

  renderCorrectButton(){
    if(this.props.cardTarget !== '' && this.props.playerTarget !== ''){
      return (
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input className="request_card" type='submit' value="Request Card"/>
        </form>
      )
    }else if(this.props.cards.length === 0){
      return (
        <div>
          <h4>You have no cards left and the deck is empty. Click the button to skip your turn.</h4>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input className="request_card" type='submit' value="Skip Turn"/>
          </form>
        </div>
      )
    }
  }

  renderCorrectCard(card, cardRank, index){
    if (cardRank === this.props.cardTarget){
      return (
        <img className='highlighted' key={`img${index + 1}`} src={`cards/${card}.png`} alt="Card in your hand" onClick={() => {this.props.cardClicked(cardRank)}}/>
      )
    }else{
      return (
        <img key={`img${index + 1}`} src={`cards/${card}.png`} alt="Card in your hand" onClick={() => {this.props.cardClicked(cardRank)}}/>
      )
    }
  }

  render() {
    const cards = this.props.cards
    if(this.props.playerTurn === 1 && Array.isArray(cards)){ // Checks if cards is actually an array and if it is your turn
      return (
        <div className='human_player'>
          <h3>{`It's your turn!`}</h3>
          <h5 className='text'>Click on a card in your hand and then click on a player to ask for that card.</h5>
          <h5 className='text'>If they have that card, you will take that card and you will get another turn.</h5>
          <h5 className='text'>Otherwise, you will go fishing and your turn will end.</h5>
          {this.renderCorrectButton()}
          <h2>{this.props.name}</h2>
          <div className="your_cards">
            {cards.map((card, index) => {
                return (
                  this.renderCorrectCard(card, this.getRank(card), index)
                )
              })
            }
          </div>
          <br/>
          {this.props.books.map((card, index) => {
            return (
              <img className='set_card' key={`img${index + 1}`} src={`cards/${card}.png`} alt={"One of your books"}/>
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
            return <img className='set_card' key={`img${index + 1}`} src={`cards/${card}.png`} alt="One of your books"/>
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
