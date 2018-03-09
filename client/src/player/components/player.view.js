import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../card/card.container';
import styles from './player.styles';

export default function Player(props) {
    const {
        id, cardPlayed, pos, active,
    } = props;

    return (
        <div style={styles.container}>
            <div style={styles.description}>
                <span>{`${id}=> `} </span>
                <span>`pos = ${pos} `</span>
                {active ? <span style={styles.active}>ACTIVE PLAYER</span> : null}
            </div>
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
    active: PropTypes.bool.isRequired,
};
