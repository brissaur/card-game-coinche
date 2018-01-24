import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/clickableCard.container';
import style from './styles';

export default function Hand({ cards }) {
    return (
        <ul style={style.hand}>
            {
                cards.map(card => (
                    <li key={card.id} style={style.cardInHand}>
                        <Card {...card} />
                    </li>
                ))
            }
        </ul>
    );
}

Hand.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        suit: PropTypes.string,
        cardValue: PropTypes.string,
        id: PropTypes.number,
    })),
};
