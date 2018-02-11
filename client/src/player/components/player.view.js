import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../card/card.container';
import styles from './player.styles';

export default function Player({ id, cardId }) {
    return (
        <div style={styles.container}>
            <span>{`${id}=> `} </span>
            {cardId ? (
                <div key={cardId} style={styles.card}>
                    <Card id={cardId} />
                </div>
            ) : null}
        </div>
    );
}

Player.propTypes = {
    id: PropTypes.string.isRequired,
    cardId: PropTypes.string,
};
