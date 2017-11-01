import React, { Component } from 'react';
import { connect } from 'react-redux'

import logo from './logo.svg';
import './App.css';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({ type: 'TEST_ACTION', payload: {}})
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.props.onClick}>CLICK ME DUDE!</button>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(App);
