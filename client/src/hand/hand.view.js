import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card.container';

export default function Hand({ cards }) {
    return (
        <ul>
            {
                cards.map(card =>
                    (<li key={card.id}>
                        <Card cardValue={card.cardValue} suit={card.suit} />
                     </li>
                    ))
            }
        </ul>
    );
}

Hand.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        suit: PropTypes.string,
        cardValue: PropTypes.number,
        id: PropTypes.number,
    })),
};
