import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/clickableCard.container';
import style from './styles';

export default function Hand({ cards }) {
    return (
        <ul style={style.hand}>
            {
                cards.map(card => (
                    <li key={card} style={style.cardInHand}>
                        <Card id={card} />
                    </li>
                ))
            }
        </ul>
    );
}

Hand.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.string),
};
