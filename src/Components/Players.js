import React from 'react';
import '../App.css';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/players', {
      method: 'POST',
      body: JSON.stringify({
        number: this.state.value
      })
    }).then(response => this.props.updateState("Game"))
  }

  render() {
    return (
      <div className='wrapper'>
        <h1>Welcome to Go Fish!</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h3>How many players would you like to player with?(Max of 8)</h3>
          <input name="numOfPlayers" type="number" min='3' max='8' required="" value={this.state.value} onChange={this.handleChange.bind(this)}/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

export default Players;
