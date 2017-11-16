import React from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand.view';

import styles from './styles';

const fakeHand = [
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

export default function Board({ children }) {
    return (
        <div style={styles.board}>
            <h1 style={styles.mainTitle}> Welcome to this app coinche! </h1>
            <Hand cards={fakeHand} />
            { children }
        </div>
    );
}

Board.propTypes = {
    children: PropTypes.node,
};
