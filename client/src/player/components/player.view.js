import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../card/card.container';
import styles from './player.styles';

export default function Player(props) {
    const { id, cardPlayed, pos } = props;

    return (
        <div style={styles.container}>
            <span>{`${id}=> `} </span>
            <span>`pos = ${pos}`</span>
            {cardPlayed ? (
                <div key={cardPlayed} style={styles.card}>
                    <Card id={cardPlayed} />
                </div>
            ) : null}
        </div>
    );
}

Player.propTypes = {
    id: PropTypes.string.isRequired,
    pos: PropTypes.number.isRequired,
    cardPlayed: PropTypes.string,
};
