import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/clickableCard.container';
import style from './styles';

export default function Hand({ cardsId }) {
    return (
        <ul style={style.hand}>
            {cardsId.map(cardId => (
                <li key={cardId} style={style.cardInHand}>
                    <Card id={cardId} />
                </li>
            ))}
        </ul>
    );
}

Hand.propTypes = {
    cardsId: PropTypes.arrayOf(PropTypes.string),
};
