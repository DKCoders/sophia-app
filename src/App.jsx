import { Component } from 'react';

export default class App extends Component {
  state = {
    name: 'sophia-app',
  };

  render() {
    return (
      <div className="container">
        <h1>Welcome to {this.state.name}</h1>
      </div>
    );
  }
}
