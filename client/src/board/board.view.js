import React from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand.view';

import styles from './styles';

export default function Board({ children, handCards = [] }) {
    return (
        <div style={styles.board}>
            <h1 style={styles.mainTitle}> Welcome to this app coinche! </h1>
            <Hand cards={handCards} />
            { children }
        </div>
    );
}

Board.propTypes = {
    children: PropTypes.node,
    handCards: PropTypes.arrayOf(PropTypes.string),
};
