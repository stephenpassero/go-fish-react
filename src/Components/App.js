import React, { Component } from 'react';
import '../App.css';
import Join from './Join.js'
import Game from './Game.js'
import Players from './Players.js'
import EndGame from './EndGame.js'

class App extends Component {
  constructor(){
    super()
    this.state = {componentToRender: "Join"}
    this.updateState = this.updateState.bind(this)
  }

  updateState(str){
    this.setState({componentToRender: str});
  }

  componentDidMount(){
    fetch('/app', { method: 'GET'})
    .then(data => data.json())
    .then((data) => {
      if(data['game'] === true){
        this.setState({componentToRender: 'Game'})
      }else if(data['game'] === false){
        this.setState({componentToRender: 'Join'})
      }
    })
  }

  render() {
    if (this.state.componentToRender === "Join"){
      return (
        <div>
          <Join updateState={this.updateState.bind(this)}/>
        </div>
      );
    }else if (this.state.componentToRender === "Players") {
      return (
        <div>
          <Players updateState={this.updateState.bind(this)}/>
        </div>
      );
    }else if (this.state.componentToRender === "EndGame") {
      return (
        <div>
          <EndGame updateState={this.updateState.bind(this)}/>
        </div>
      );
    }else{
      return (
        <div>
          <Game updateState={this.updateState.bind(this)}/>
        </div>
      );
    }
  }
}

export default App;
