import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const getCardSrc = cardId =>
    // eslint-disable-next-line
    require(`../../public/images/cards/${cardId}.png`);

export default function Card({ active, id }) {
    console.log('active', active);
    const style = { ...styles.card, ...(active ? styles.active : null) };

    return <img src={getCardSrc(id)} alt={id} style={style} />;
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
};
