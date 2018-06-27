import React from 'react';
import '../App.css';

class RobotPlayer extends React.Component {

  render() {
    const myBooks = this.props.robotBooks[this.props.index]
    if (myBooks === undefined){
      return (
        <div className="player_div">
          <h2>{this.props.name}</h2>
          <img src="cards/backs_red.png" alt='Red Card Back'/>
        </div>
      )
    }else{
      return (
        <div className="player_div">
          <h2>{this.props.name}</h2>
          <img src="cards/backs_red.png" alt='Red Card Back'/>
          <br/>
          {myBooks.map((card, index) => {
            return <img className='set_card' key={`img${index + 1}`} src={`cards/${card}.png`} alt="Card in robot books"/>
          })
          }
        </div>
      )
    }
  }
}

export default RobotPlayer;
