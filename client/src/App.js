import React from 'react';
import { connect } from 'react-redux';

import Board from './board/board.view';
import Hand from './hand/hand.view';
import UserConnect from './users/connect.container'

const mapDispatchToProps = dispatch => ({
    onClick: () => {
        dispatch({ type: 'TEST_ACTION', payload: {} });
    },
});

const toto = () => {
    return [
        {
            id: 1,
            suit: 'spades',
            cardValue: 1,
        },
        {
            id: 2,
            suit: 'heart',
            cardValue: 1,
        },
        {
            id: 3,
            suit: 'diamonds',
            cardValue: 1,
        },
        {
            id: 4,
            suit: 'clubs',
            cardValue: 1,
        },
        {
            id: 5,
            suit: 'spades',
            cardValue: 9,
        },
    ];
};

function App() {
    return (
      <Board>
        <button onClick={this.props.onClick}>CLICK ME DUDE!</button>
        <UserConnect />
        <Hand cards={toto()} />
      </Board>
    );
}

export default connect(
    null,
    mapDispatchToProps,
)(App);
