import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const getCardSrc = cardId =>
    // eslint-disable-next-line
     require(`../../public/images/cards/${cardId}.png`);
export default function Card({ id }) {
    return (
        <img
            src={getCardSrc(id)}
            alt={id}
            style={styles.card}
        />
    );
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
};
