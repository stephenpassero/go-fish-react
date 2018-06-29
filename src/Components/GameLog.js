import React from 'react';
import '../App.css';

class GameLog extends React.Component {
  render() {
    if(this.props.responses !== ''){
      return (
        <div className='history'>
        <h2>Game Log:</h2>
          {this.props.responses.map((response, index) => {
            return (
              <h5 className='low_margin' key={`p${index + 1}`}>{response}</h5>
            )
          })}
        </div>
      )
    }else{
      return (
        <div className='history'>
        </div>
      )
    }

  }
}

export default GameLog;
