import React from 'react';
import { connect } from 'react-redux';

import Board from './board/board.view';
import Hand from './hand/hand.view';
import UserConnect from './users/connect.container';

const mapDispatchToProps = dispatch => ({
    onClick: () => {
        dispatch({ type: 'TEST_ACTION', payload: {} });
    },
});

const toto = () => [
    {
        id: 1,
        suit: 'spades',
        cardValue: 'A',
    },
    {
        id: 2,
        suit: 'heart',
        cardValue: 'A',
    },
    {
        id: 3,
        suit: 'diamonds',
        cardValue: 'J',
    },
    {
        id: 4,
        suit: 'clubs',
        cardValue: 'Q',
    },
    {
        id: 5,
        suit: 'spades',
        cardValue: '9',
    },
    {
        id: 6,
        suit: 'spades',
        cardValue: '9',
    },
    {
        id: 7,
        suit: 'spades',
        cardValue: '9',
    },
    {
        id: 8,
        suit: 'spades',
        cardValue: '9',
    },
];

function App() {
    return (
        <Board>
            <UserConnect />
            <Hand cards={toto()} />
        </Board>
    );
}

export default connect(
    null,
    mapDispatchToProps,
)(App);
