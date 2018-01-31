import React from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand.view';

import styles from './styles';

export default function Board({ children, handCards, trick }) {
    global.console.log('trick', trick);

    return (
        <div style={styles.board}>
            <h1 style={styles.mainTitle}> Welcome to this app coinche! </h1>
            <Hand cardsId={handCards} />
            {children}
        </div>
    );
}

Board.propTypes = {
    children: PropTypes.node,
    handCards: PropTypes.arrayOf(PropTypes.string),
    trick: PropTypes.arrayOf(PropTypes.shape({
        playerId: PropTypes.string,
        cardId: PropTypes.string,
    })).isRequired,
};
