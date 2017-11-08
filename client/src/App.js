import React from 'react';
import { connect } from 'react-redux';

import Board from './board/board.view';

const mapDispatchToProps = dispatch => ({
  onClick: () => {
    dispatch({ type: 'TEST_ACTION', payload: {} });
  },
});

function App() {
  return (
    <Board>
      <button onClick={this.props.onClick}>CLICK ME DUDE!</button>
    </Board>
  );
}

export default connect(
  null,
  mapDispatchToProps,
)(App);
