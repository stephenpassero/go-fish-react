import React from 'react';
import '../App.css';

class RobotPlayer extends React.Component {

  render() {
    return (
      <div key={`div${this.props.index + 1}`} className="player_div">
        <h2 key={`h2${this.props.index + 1}`}>{this.props.name}</h2>
        <img src="cards/backs_red.png" alt='Red Card Back'/>
        <br/>
        <img className='set_card' src="cards/s7.png" alt='card'/>
        <img className='set_card' src="cards/sk.png" alt='card'/>
      </div>
    )
  }
}

export default RobotPlayer;
