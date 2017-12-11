import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from './card.container';
import { cardPlayed } from './ducks';

function ClickableCard({ onCardPlayed, ...card }) {
    return (
        <div onClick={() => onCardPlayed(card)}>
            <Card {...card} />
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        onCardPlayed(card) {
            dispatch(cardPlayed(card));
        },
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(ClickableCard);

ClickableCard.propTypes = {
    onCardPlayed: PropTypes.func,
};
