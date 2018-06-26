import React from 'react';
import './App.css';

class Join extends React.Component {
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
    fetch('/join', {
      method: 'post',
      body: JSON.stringify({
        name: this.state.value
      })
    }).then(function(response) {
    console.log(response.json());
  })
    event.preventDefault();
  }

  render() {
    return (
      <div className='wrapper'>
        <h1> Welcome to Go Fish!</h1>
        <form onSubmit={this.handleSubmit}>
          <h3> Type in your name:</h3>
          <input name="name" type="text" required="" value={this.state.value} onChange={this.handleChange}/>
          <input type='submit' value='Submit'/>
        </form>
      </div>
    );
  }
}

export default Join;
