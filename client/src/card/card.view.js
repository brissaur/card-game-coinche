import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const getCardName = (suit, value) => {
    const cardSuit = suit.substring(0, 1).toUpperCase();

    return value + cardSuit;
};

const getCardSrc = (suit, value) => {
    const cardName = getCardName(suit, value);
    // eslint-disable-next-line
    return require(`../../public/images/cards/${cardName}.png`);
};

export default function Card({ suit, cardValue }) {
    return (
        <img
            src={getCardSrc(suit, cardValue)}
            alt={getCardName(suit, cardValue)}
            style={styles.card}
        />
    );
}

Card.propTypes = {
    suit: PropTypes.string.isRequired,
    cardValue: PropTypes.string.isRequired,
};
