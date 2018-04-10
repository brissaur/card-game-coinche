import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/clickableCard.container';
import style from './styles';

export default function Hand({ cardsId, isActive, mode }) {
    return (
        <ul style={style.hand}>
            {cardsId.map(cardId => (
                <li key={cardId} style={style.cardInHand}>
                    <Card id={cardId} playable={isActive && mode === 'play'} />
                </li>
            ))}
        </ul>
    );
}

Hand.propTypes = {
    cardsId: PropTypes.arrayOf(PropTypes.string),
    isActive: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
};
