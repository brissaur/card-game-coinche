import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const getCardSrc = cardId =>
    // eslint-disable-next-line
    require(`../../public/images/cards/${cardId}.png`);

export default function Card({ active, id }) {
    const style = { ...styles.card, ...(active ? styles.active : null) };

    return <img src={getCardSrc(id)} alt={id} style={style} />;
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
};
