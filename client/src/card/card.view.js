import React from 'react';
import styles from './styles';

const getCardSrc = cardId =>
    // eslint-disable-next-line
     require(`../../public/images/cards/${cardId}.png`);
export default function Card(card) {
    return (
        <img
            src={getCardSrc(card.id)}
            alt={card.id}
            style={styles.card}
        />
    );
}
