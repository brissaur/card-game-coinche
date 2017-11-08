import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ suit, cardValue }) {
    return (
        <div>
            <div>{suit}</div>
            <div>{cardValue}</div>
        </div>
    );
}

Card.propTypes = {
    suit: PropTypes.string.isRequired,
    cardValue: PropTypes.number.isRequired,
};
